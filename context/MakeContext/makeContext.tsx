import React, {
  createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState,
} from 'react'

import {
  deleteDoc, doc, setDoc, updateDoc,
} from 'firebase/firestore'
import { isSameDay } from 'date-fns'
import { toast } from 'react-hot-toast'
import { db } from '../../firebase/initFirebase'
import useFirestoreFetcher from '../../hooks/useFirestoreFetcher'

import Spinner from '../../components/Layout/Spinner/Spinner'

import { OrderContext } from '../OrderContext/orderContext'
import { DeliveryDateContext } from '../DeliveryDateContext/deliveryDateContext'

import {
  DoughCountTypes, MakeContextProps, MakeProviderPropTypes, setRecipePropTypes,
} from './makeContext.types'
import { RecipeType } from '../../components/Make/Recipes/Recipes.types'
import { Order } from '../../components/Orders/Order.types'
import { Product } from '../../components/Make/Counts/DonutTotals/DonutTotals.types'

export const MakeContext = createContext({} as MakeContextProps)
MakeContext.displayName = 'MakeContext'

export const MakeProvider = ({ children }: MakeProviderPropTypes): JSX.Element => {
  const { orders } = useContext(OrderContext)
  const { nextDeliveryDateFromMaster } = useContext(DeliveryDateContext)

  const getRecipes = useFirestoreFetcher('recipes')
  const [doughCount, setDoughCount]: DoughCountTypes['state'] = useState()
  const [donutTotals, setDonutTotals]: [Product[] | undefined, Dispatch<SetStateAction<Product[] | undefined>>] = useState()
  const [featureDonutName, setFeatureDonutName] = useState('')
  const [featureDoughType, setFeatureDoughType]: [string, Dispatch<SetStateAction<string>>] = useState('Please select a feature dough type above')
  const [recipes, setRecipes] = useState({} as RecipeType[])
  const [refresh, setRefresh] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Recipe Methods
  const fetchRecipes = useCallback(() => {
    setLoading(true)
    getRecipes.then((res) => {
      setRecipes(res as RecipeType[])
      setLoading(false)
    }).catch((err) => {
      setError(err)
      setLoading(false)
    })
  }, [getRecipes])

  useEffect(() => fetchRecipes(), [])

  const deleteRecipe = async (item: string) => {
    await deleteDoc(doc(db, 'recipes', item))
      .then(() => toast.success(`Deleted ${item}`))
  }

  const addRecipe = async ({ data, name }: setRecipePropTypes) => {
    await setDoc(doc(db, 'recipes', name), data)
      .then(() => toast.success(`Created new document ${name}: ${data}`))
  }

  const refreshRecipes = useCallback(() => {
    setLoading(true)
    setRefresh(refresh + 1)
    fetchRecipes()
  }, [fetchRecipes, refresh])

  const updateRecipes = useCallback(async (itemName, edits) => {
    const docRef = doc(db, 'recipes', `${itemName}`)
    await updateDoc(docRef, edits).then(() => {
      toast.success(`Item ${itemName} updated`)
    })
  }, [])

  // Donut Total Methods
  const numberOfEachDonut = useCallback((orderList: Order[], nextDelivery: Date) => {
    const productQuantityObj = {} as Product[]
    if (orderList) {
      Object.values(orderList).forEach((order: Order) => {
        const findDeliveryDateKey = Object.values(order.meta_data).filter(
          (el) => el.key === 'Delivery Date',
        )[0] as { id: number, key: string, value: string }

        const deliveryDateOfOrder = new Date(findDeliveryDateKey.value)

        if (isSameDay(deliveryDateOfOrder, nextDelivery)) {
          Object.values(order.line_items).forEach((item): void => {
            let productQuantityRef = 0
            if (productQuantityObj[item.product_id]) {
              productQuantityRef = productQuantityObj[item.product_id].quantity
            }
            Object.assign(productQuantityObj, { [item.product_id]: { quantity: productQuantityRef + item.quantity, name: item.name } })
          })
        }
      })
    }
    return productQuantityObj
  }, [])

  useMemo(() => {
    if (orders !== undefined && nextDeliveryDateFromMaster !== undefined) {
      setDonutTotals(numberOfEachDonut(orders as unknown as Order[], nextDeliveryDateFromMaster as Date))
    }
  }, [nextDeliveryDateFromMaster, numberOfEachDonut, orders])

  // Dough Count Methods
  const whichDough = useCallback((productId: number) => {
    const doughTypes: DoughCountTypes['doughTypes'] = {
      255: 'dough1',
      258: 'dough2',
      256: 'dough3',
      257: 'dough3',
      262: 'dough3',
      264: 'dough3',
      265: 'dough4',
      269: 'dough4',
    }
    if (doughTypes[productId] === undefined) {
      if (featureDoughType === 'other') return 'feature'
      if (featureDoughType !== 'other' && featureDoughType !== 'Please select a feature dough type above') return featureDoughType
      return 'Please select a feature dough type above'
    }
    return doughTypes[productId]
  }, [featureDoughType])

  const setFeatureInStorage = () => {

  }

  const doughCounter = useCallback((donuts: Product[] | undefined) => {
    const doughTotals: {[dough:string]: number} = {}
    if (donuts !== undefined) {
      Object.entries(donuts).forEach((donut) => {
        const nameOfDough = () => {
          const donutId = Number(donut[0])
          const donutName = donut[1].name
          if (whichDough(donutId) === 'feature') {
            setFeatureDonutName(donutName)
            return donutName
          }
          if (whichDough(donutId) === 'Please select a feature dough type above') setFeatureDonutName(donut[1].name)
          return whichDough(donutId) as string
        }

        let quantityOfDough = 0
        if (doughTotals[nameOfDough()]) {
          quantityOfDough = doughTotals[nameOfDough()]
        }
        Object.assign(doughTotals, { [nameOfDough()]: quantityOfDough + donut[1].quantity })
      })
    }
    setDoughCount(doughTotals)
  }, [whichDough])

  useMemo(() => doughCounter(donutTotals), [donutTotals, doughCounter])

  const value = useMemo(() => ({
    addRecipe,
    deleteRecipe,
    doughCount,
    donutTotals,
    featureDonutName,
    featureDoughType,
    setFeatureDoughType,
    recipes,
    refreshRecipes,
    updateRecipes,
  }), [donutTotals, doughCount, featureDonutName, featureDoughType, recipes, refreshRecipes, updateRecipes])

  return (
    <MakeContext.Provider value={value}>
      {error && <p>MakeContext Error</p>}
      {loading ? (
        <div
          className="z-50 flex align-middle justify-center absolute right-0 bg-gradient-to-r from-donutGradientPink to-donutGradientGreen w-full h-screen drop-shadow"
        >
          <div className="my-auto"><Spinner /></div>
        </div>
      ) : children}
    </MakeContext.Provider>
  )
}

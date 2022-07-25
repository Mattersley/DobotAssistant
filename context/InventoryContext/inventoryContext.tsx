import React, {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react'

import {
  deleteDoc, doc, setDoc, updateDoc,
} from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { db } from '../../firebase/initFirebase'
import useFirestoreFetcher from '../../hooks/useFirestoreFetcher'

import Spinner from '../../components/Layout/Spinner/Spinner'

import InventoryCardPropTypes from '../../components/Inventory/InventoryCard/InventoryCard.types'
import { InventoryContextProps, InventoryProviderPropTypes, setInventoryItemPropTypes } from './inventoryContext.types'

export const InventoryContext = createContext({} as InventoryContextProps)
InventoryContext.displayName = 'InventoryContext'

export const InventoryProvider = ({ children }: InventoryProviderPropTypes): JSX.Element => {
  const getInventory = useFirestoreFetcher('inventory')
  const [items, setItems] = useState({} as InventoryCardPropTypes)
  const [refresh, setRefresh] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchInventory = useCallback(() => {
    setLoading(true)
    getInventory.then((res) => {
      setItems(res as InventoryCardPropTypes)
      setLoading(false)
    }).catch((err) => {
      setError(err)
      setLoading(false)
    })
  }, [getInventory])

  useEffect(() => fetchInventory(), [])

  const deleteInventoryItem = async (item: string) => {
    await deleteDoc(doc(db, 'inventory', item))
      .then(() => toast.success(`Deleted ${item}`))
  }

  const setInventoryItem = async ({ data, name }: setInventoryItemPropTypes) => {
    await setDoc(doc(db, 'inventory', name), data)
      .then(() => toast.success(`Created new document ${name}: ${data}`))
  }

  const refreshInventory = useCallback(() => {
    setLoading(true)
    setRefresh(refresh + 1)
    fetchInventory()
  }, [fetchInventory, refresh])

  const updateInventory = useCallback(async (itemName, edits) => {
    const docRef = doc(db, 'inventory', `${itemName}`)
    await updateDoc(docRef, edits).then(() => {
      toast.success(`Item ${itemName} updated`)
    })
  }, [])

  const value = useMemo(() => ({
    items,
    deleteInventoryItem,
    refreshInventory,
    setInventoryItem,
    refresh,
    updateInventory,
  }), [items, refresh, refreshInventory, updateInventory])

  return (
    <InventoryContext.Provider value={value}>
      {error && <p>InventoryContext Error</p>}
      {loading ? (
        <div
          className="z-50 flex align-middle justify-center absolute right-0 bg-gradient-to-r from-donutGradientPink to-donutGradientGreen w-full h-screen drop-shadow"
        >
          <div className="my-auto"><Spinner /></div>
        </div>
      ) : children}
    </InventoryContext.Provider>
  )
}

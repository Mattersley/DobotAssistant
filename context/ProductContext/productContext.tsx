import React, {
  createContext, Dispatch, SetStateAction, useEffect, useMemo, useState,
} from 'react'
import Spinner from '../../components/Layout/Spinner/Spinner'
import useProductFetcher from '../../hooks/useProductFetcher'
import { ProductContextProps, WooProductType } from './productContext.types'

interface ProductProviderPropTypes {
  children: React.ReactElement
}

export const ProductContext = createContext({} as ProductContextProps)
ProductContext.displayName = 'ProductContext'

export const ProductProvider = ({ children }: ProductProviderPropTypes): JSX.Element => {
  const [productNames, setProductNames]: [string[] | undefined, Dispatch<SetStateAction<string[] | undefined>>] = useState()

  // Fetch Orders
  const {
    data, isLoading, isError, productMutate,
  } = useProductFetcher()

  const products = data?.data as WooProductType[]

  useEffect(() => {
    const array: string[] = []
    if (products !== undefined) {
      Object.entries(products).sort().forEach((product) => {
        array.push(product[1].name.replace('</br>', ' '))
      })
      setProductNames(array)
    }
  }, [products])

  // Set Context Values
  const value = useMemo(() => ({
    products,
    productNames,
    productMutate,
  }), [productMutate, productNames, products])

  return (
    <ProductContext.Provider value={value}>
      {isError && <p>ProductContext Error</p>}
      {isLoading ? (
        <div className="z-50 flex align-middle justify-center absolute right-0 bg-gradient-to-r from-donutGradientPink to-donutGradientGreen w-full h-screen drop-shadow">
          <div className="my-auto"><Spinner /></div>
        </div>
      ) : children}
    </ProductContext.Provider>
  )
}

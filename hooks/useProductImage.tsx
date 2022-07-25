import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../components/Layout/Spinner/Spinner'
import { ProductContext } from '../context/ProductContext/productContext'

const useDonutImage = (donutName: string): { url: string; productImage: JSX.Element } => {
  const { products } = useContext(ProductContext)
  const [url, setUrl] = useState('')

  const findProduct = Object.values(products).find((product) => product.name === donutName)

  useEffect(() => {
    if (findProduct === undefined) {
      setUrl('public/images/DobotConstruction.svg')
    }
    setUrl(findProduct.images[0].src)
  }, [findProduct])

  const productImage = (
    <div>
      {url === '' ? (
        <div className="w-full h-1/4 flex align-middle items-center justify-center mx-auto my-6">
          <Spinner
            relative
          />
        </div>
      ) : <img alt="Donut" src={url} />}
    </div>
  )

  return { url, productImage }
}

export default useDonutImage

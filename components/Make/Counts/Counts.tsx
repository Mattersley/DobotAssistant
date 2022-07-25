import {
  Dispatch, SetStateAction, useContext, useEffect, useState,
} from 'react'
import DonutTotals from './DonutTotals/DonutTotals'
import DoughTotals from './DoughTotals/DoughTotals'
import DoughTypeRadio from './DoughTypeRadio/DoughTypeRadio'
import { MakeContext } from '../../../context/MakeContext/makeContext'
import { Product } from './DonutTotals/DonutTotals.types'
import PrintTicket from './Ticket/PrintTicket/PrintTicket'
import CountButtons from './CountButtons/CountButtons'

export type ProductType = {
    name: string,
    quantity: number
}

interface CountsTypes {
    productState: [ProductType[] | undefined, Dispatch<SetStateAction<ProductType[] | undefined>>]
    props: { totals: Product[] | undefined }
}

const Counts = () => {
  const { doughCount, donutTotals, featureDoughType } = useContext(MakeContext)

  const [products, setProducts]: CountsTypes['productState'] = useState()
  const [printTicket, setPrintTicket] = useState(false)

  useEffect(() => {
    const productArray: ProductType[] = []
    if (donutTotals !== undefined) Object.values(donutTotals).map((product) => (productArray.push(product)))
    setProducts(productArray)
  }, [donutTotals])

  return (
    <>
      {featureDoughType === 'Please select a feature dough type above' ? (
        <div className="h-full w-screen fixed">
          <DoughTypeRadio withBackdrop />
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-between mt-20 -mb-10 sm:mb-5">
            <CountButtons printTicket={printTicket} setPrintTicket={setPrintTicket} />
          </div>
          <div>
            <DoughTypeRadio />
          </div>
        </>
      )}

      {printTicket ? (<PrintTicket doughCount={doughCount} products={products} setShow={setPrintTicket} />) : null}

      <div className="grid grid-flow-row sm:grid-cols-2 h-full">
        <DonutTotals products={products} />
        <div className="sm:hidden self-center mx-auto sm:mx-0 h-0 sm:h-96 w-80 sm:w-0 border border-gray-500" />
        <DoughTotals doughCount={doughCount} />
      </div>

    </>
  )
}

export default Counts

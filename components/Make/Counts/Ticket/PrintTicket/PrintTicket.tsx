import { PrinterIcon } from '@heroicons/react/solid'
import { useReactToPrint } from 'react-to-print'
import React, {
  Dispatch, SetStateAction,
  useContext, useRef, useState,
} from 'react'
import CountTicket from './CountTicket/CountTicket'
import { DeliveryDateContext } from '../../../../../context/DeliveryDateContext/deliveryDateContext'
import { ProductType } from '../../Counts'

export interface PrintTicketTypes {
    props: {
        doughCount: { [p: string]: number } | undefined,
        products: ProductType[] | undefined,
        setShow: (bool: boolean) => void,
    },
    separatedProducts: {
        dough1Donuts: {[donutName: string]: ProductType},
        dough2Donuts: {[donutName: string]: ProductType},
        otherDonuts: {[donutName: string]: ProductType},
    },
    state: [PrintTicketTypes['separatedProducts'],
        Dispatch<SetStateAction<PrintTicketTypes['separatedProducts']>>
    ]
}

const PrintTicket = ({ doughCount, products, setShow }: PrintTicketTypes['props']) => {
  const [separatedDonutTypes]: PrintTicketTypes['state'] = useState(() => {
    const obj: PrintTicketTypes['separatedProducts'] = { dough1Donuts: {}, dough2Donuts: {}, otherDonuts: {} }
    products?.forEach((donut) => {
      if (donut.name.includes('Dough1')) obj.dough1Donuts[donut.name] = donut
      if (donut.name.includes('Dough2')) obj.dough2Donuts[donut.name] = donut
      if (!donut.name.includes('Dough1') && !donut.name.includes('Dough2')) obj.otherDonuts[donut.name] = donut
    })
    return obj
  })
  const printRef = useRef(null)
  const { nextDeliveryDateFromToday } = useContext(DeliveryDateContext)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  return (
    <>
      <div>
        <div className="absolute w-full flex flex-col align-middle items-center justify-center my-4">
          <div className="p-3 pt-5 border flex flex-col align-middle items-center w-cardWidth h-cardHeight bg-white z-50 rounded-xl">
            <CountTicket donutTypes={separatedDonutTypes} doughs={doughCount} nextDelivery={nextDeliveryDateFromToday} />
          </div>
          <div className="absolute">
            <div className="p-4 -mt-16 mb-0 ml-20 flex flex-col align-middle items-center w-cardPrintWidth h-cardPrintHeight bg-white transform rotate-90" ref={printRef}>
              <CountTicket donutTypes={separatedDonutTypes} doughs={doughCount} nextDelivery={nextDeliveryDateFromToday} />
            </div>
          </div>
          <button
            className="flex flex-row align-middle items-center justify-center rounded-xl shadow p-3 px-5 text-white bg-donutPink w-auto mx-auto my-4 z-50"
            onClick={handlePrint}
            type="button"
          >
            <div className="w-5 h-5 mr-1"><PrinterIcon /></div>
            <p className="tinyText">Print</p>
          </button>
        </div>

      </div>
      <button
        className="fixed overflow-clip top-0 right-0 w-full h-screen bg-gray-500 bg-opacity-80 border-none cursor-default z-10"
        id="closeView"
        onClick={() => setShow(false)}
        onKeyDown={() => setShow(false)}
        type="button"
      >
        <label className="hidden" htmlFor="closeView">Close View</label>
      </button>
    </>
  )
}

export default PrintTicket

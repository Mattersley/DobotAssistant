import { useReactToPrint } from 'react-to-print'
import {
  MutableRefObject, useContext, useRef, useState,
} from 'react'
import { PrinterIcon } from '@heroicons/react/solid'
import { OrderContext } from '../../context/OrderContext/orderContext'
import Label from '../../components/Pack/Label/Label'
import { Order } from '../../components/Orders/Order.types'
import Tooltip from '../../components/Layout/Tooltip/Tooltip'

const Pack = () => {
  const allLabelsRef = useRef(null)
  const singleLabelRef: MutableRefObject<{ [id: number]: HTMLDivElement | null }> = useRef({})
  const [currentId, setCurrentId] = useState(0)
  const { ordersForNextDeliveryDay } = useContext(OrderContext)

  const printAllLabels = useReactToPrint({
    content: () => allLabelsRef.current,
  })

  const printSingleLabel = useReactToPrint({
    content: () => singleLabelRef.current[currentId],
  })

  return (
    <>
      <div className="flex flex-col align-middle items-center justify-center justify-items-center h-full">
        <div className="flex flex-wrap justify-center align-middle items-center">
          {ordersForNextDeliveryDay !== undefined && Object.values(ordersForNextDeliveryDay).map((order: Order) => (
            <div key={order.id} className="mx-4">
              <Tooltip content="Print this label" placement="top">
                <button
                  className="w-full flex justify-end text-gray-500"
                  onClick={printSingleLabel}
                  onFocus={() => setCurrentId(order.id)}
                  onMouseOver={() => setCurrentId(order.id)}
                  type="button"
                >
                  <PrinterIcon width={15} />
                </button>
              </Tooltip>
              <Label key={order.id} order={order} />
            </div>
          ))}
        </div>
        <button
          className="mt-10 mx-auto shadow-lg w-1/2 sm:w-1/4 h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-donutPink hover:bg-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-donutPurple"
          onClick={printAllLabels}
          type="button"
        >
          <PrinterIcon className="mr-2" width={22} />
          Print All Labels
        </button>
      </div>
      <div className="absolute -left-96">
        <div ref={allLabelsRef}>
          {ordersForNextDeliveryDay !== undefined && Object.values(ordersForNextDeliveryDay).map((order: Order) => (
            <div
              key={order.id}
              ref={(element) => {
                singleLabelRef.current[order.id] = element
              }}
            >
              <Label key={order.id} order={order} print />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Pack

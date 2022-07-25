import React, { useContext } from 'react'

import { OrderContext } from '../../context/OrderContext/orderContext'
import { Order } from '../../components/Orders/Order.types'

import ButtonGroup from '../../components/Layout/ButtonGroup/ButtonGroup'
import OrderCards from '../../components/Orders/OrderCards/OrderCards'
import OrderStatsBar from '../../components/Orders/StatsBar/OrderStatsBar'
import { DeliveryDateContext } from '../../context/DeliveryDateContext/deliveryDateContext'

const Orders = () => {
  const {
    ordersForNextDeliveryDay, mutate, routeInfo,
  } = useContext(OrderContext)
  const { nextDeliveryDateFromMaster } = useContext(DeliveryDateContext)

  const onClick = (query: string) => {
    // setQuery(query)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutate({}).then()
  }

  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {ordersForNextDeliveryDay?.length === 0 ? <p className="absolute left-1/3 top-1/3 text-2xl text-donutPurple">No orders for this delivery day yet!</p>
        : (
          <>
            <div className="m-4 bg-white flex flex-row border rounded-xl mt-20 mb-0 lg:mt-4 lg:mb-4 shadow w-auto">
              <OrderStatsBar nextDeliveryDateFromMaster={nextDeliveryDateFromMaster} orders={ordersForNextDeliveryDay} routeInfo={routeInfo} />
              <ButtonGroup onClick={onClick} />
            </div>
            <OrderCards data={ordersForNextDeliveryDay as Order[]} />
          </>
        )}
    </>
  )
}
export default Orders

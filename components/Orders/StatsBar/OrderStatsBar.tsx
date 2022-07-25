import { TrendingUpIcon } from '@heroicons/react/solid'
import React from 'react'
import { format } from 'date-fns'
import { Order } from '../Order.types'
import { OrderContextProps } from '../../../context/OrderContext/orderContext.types'

interface OrderStatsBarPropTypes {
    dashboard?: boolean,
    orders: Order[] | undefined,
    routeInfo: OrderContextProps['routeInfo'],
    nextDeliveryDateFromMaster: Date | undefined
}

const OrderStatsBar = ({
  dashboard, orders, routeInfo, nextDeliveryDateFromMaster,
}: OrderStatsBarPropTypes) => {
  const totalAmount = () => {
    let total = 0
    if (orders) {
      Object.values(orders).forEach((order) => {
        total += Number(order.total)
      })
    }
    return total
  }

  const totalDonuts = () => {
    let total = 0
    if (orders) {
      Object.values(orders as Order[]).forEach((order) => {
        Object.values(order.line_items).forEach(
          (item) => {
            total += item.quantity
          },
        )
      })
    }
    return total
  }

  const totalOrders = () => orders && Object.keys(orders).length

  return (
    <div className={dashboard
      ? 'rounded-xl shadow-lg bg-white pb-10 xl:pb-0 w-full flex flex-col xl:h-full xl:flex-row'
      : 'bg-white flex flex-row flex-wrap rounded-xl w-full h-full'}
    >
      <p className="flex xl:flex-col text-center align-middle items-center xl:justify-center h-full p-4 xl:px-4 border-r text-donutPurple">
        <TrendingUpIcon height={22} width={22} />
        {dashboard ? (
          <small className="sm:ml-2 m-0 xl:m-0 tinyText font-bold font-mono">
            Order Stats
            <br />
            {format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')}
          </small>
        ) : null}
      </p>
      <div className="flex flex-col align-middle justify-center text-center h-full px-4 border-r">
        <small className="tinyText font-bold font-mono">Orders</small>
        <p className="text-donutPurple">{totalOrders()}</p>
      </div>
      <div className="flex flex-col align-middle justify-center text-center h-full px-4 border-r">
        <small className="tinyText font-bold font-mono">Total</small>
        <p className="text-donutPurple">{`$${totalAmount().toFixed(2)}`}</p>
      </div>
      <div className="flex flex-col align-middle justify-center text-center h-full px-4 border-r">
        <small className="tinyText font-bold font-mono">Donuts</small>
        <p className="text-donutPurple">{totalDonuts()}</p>
      </div>
      {routeInfo?.[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')]
            && Object.values(routeInfo[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')].trips).map((trip) => (
              <React.Fragment key={trip.geometry}>
                <div className={!dashboard
                  ? 'hidden sm:block flex flex-col align-middle justify-center text-center h-full px-4 border-r'
                  : 'flex flex-col align-middle justify-center text-center h-full px-4 border-r'}
                >
                  <small className="tinyText font-bold font-mono">Delivery Time</small>
                  <p className="text-donutPurple">
                    {trip && Math.round(trip.duration / 60)}
                    {' '}
                    min
                  </p>
                </div>
                <div className={!dashboard
                  ? 'hidden sm:block flex flex-col align-middle justify-center text-center h-full px-4 border-r'
                  : 'flex flex-col align-middle justify-center text-center h-full px-4'}
                >
                  <small className="tinyText font-bold font-mono">Delivery Time</small>
                  <p className="text-donutPurple">
                    {trip && Math.round(trip.distance / 1000)}
                    {' '}
                    km
                  </p>
                </div>
              </React.Fragment>
            ))}
    </div>
  )
}

OrderStatsBar.defaultProps = {
  dashboard: false,
}

export default OrderStatsBar

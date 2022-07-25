import React from 'react'
import OrderDonuts from './OrderDonuts/OrderDonuts'
import { Order } from '../../Order.types'
import { capitalise } from '../../../../shared/helper'
import { sortByDonutName } from '../../../../shared/sorting'

interface OrderCardPropTypes {
    order: Order
}

const OrderCard = ({ order }: OrderCardPropTypes) => {
  const details = order

  const numberOfDonuts = (orderInfo: Order): number => {
    let donuts = 0
    if (orderInfo.line_items !== undefined && orderInfo.line_items !== null) {
      Object.values(orderInfo.line_items).forEach(
        (el) => {
          donuts += el.quantity
          return el
        },
      )
    }
    return donuts
  }

  return (
    <div key={details.id} className="receiptEdges py-10 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 grid grid-cols-3 px-8 bg-white shadow-lg mx-1 md:mx-3 my-1 md:my-3">
      <div>
        <h2 className="text-gray-800 text-2xl font-semibold font-display">{details.id}</h2>
        <p className="text-sm">{`${numberOfDonuts(details)} Donuts`}</p>
      </div>
      <div className="col-span-2">
        <div>
          <p className="text-xl font-extrabold font-mono text-donutPurple">
            {details.billing && `${capitalise(details.billing.first_name)} ${capitalise(details.billing.last_name)}`}
          </p>
          <small className="font-mono">{`${capitalise(details.shipping.address_1)} ${capitalise(details.shipping.address_2)}, ${capitalise(details.shipping.city)}, ${details.shipping.postcode}`}</small>
        </div>
      </div>

      <div className="col-span-3 my-3 border-t border-gray-200">
        <div className="mt-4">
          {Object.entries(details.line_items).sort(sortByDonutName).map((donut) => (
            <OrderDonuts
              key={donut[1].name}
              donutDetails={{
                name: donut[1].name,
                quantity: donut[1].quantity,
                price: donut[1].price,
              }}
            />
          ))}
        </div>
      </div>
      <div className="col-span-1 col-start-3 text-right border-t">
        {details.fee_lines[0] && (
        <div className="relative flex flex-row justify-end mt-1">
          <small className="font-mono mr-1 w-full right-10 absolute">
            {`${details.fee_lines[0].name.replace('Custom $', '$')}:`}
          </small>
          <small>{`$${details.fee_lines[0].total}`}</small>
        </div>
        )}
        {details.coupon_lines[0] && (
        <div className="relative flex flex-row justify-end mt-1">
          <small className="font-mono mr-3 w-full right-10 absolute">Coupon: </small>
          <small>{`-$${Number(details.coupon_lines[0].discount).toFixed(2)}`}</small>
        </div>
        )}
        <p className="text-sm font-bold text-donutPurple mt-1">{`$${details.total}`}</p>
      </div>

      {details.customer_note && (
      <div className="col-span-3">
        <small className="font-mono font-bold">Customer Note: </small>
        <small className="text-xs font-mono leading-none">{details.customer_note}</small>
      </div>
      )}

    </div>
  )
}

export default OrderCard

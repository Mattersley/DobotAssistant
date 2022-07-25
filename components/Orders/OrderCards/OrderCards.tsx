import React from 'react'
import OrderCard from './OrderCard/OrderCard'
import { Order } from '../Order.types'

interface OrderCardsPropTypes {
  data: Order[]
}

const OrderCards = ({ data }: OrderCardsPropTypes) => (
  <div className="receiptEdgesShadow flex flex-wrap justify-center mt-10 mx-6 md:mx-0">
    {data && Object.entries(data).sort().map((order) => {
      const eachOrder = order[1]
      return <OrderCard key={eachOrder.id} order={eachOrder} />
    })}
  </div>
)

export default OrderCards

import React from 'react'

interface OrderDonutPropTypes {
    donutDetails: {
        name: string,
        quantity: number,
        price: number
    }
}

const OrderDonut = ({ donutDetails }: OrderDonutPropTypes) => (
  <div key={donutDetails.name}>
    <div className="text-left flex flex-row align-middle items-center">
      <p className="mr-2">{`${donutDetails.quantity}`}</p>
      <p className="text-xs font-mono">{donutDetails.name.replace('</br>', ' ')}</p>
      <p className="ml-auto text-right text-xs align-middle items-center">{`$${donutDetails.price.toFixed(2)}`}</p>
    </div>
  </div>
)

export default OrderDonut

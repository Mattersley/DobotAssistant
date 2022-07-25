import { useEffect, useState } from 'react'
import { Order } from '../../Orders/Order.types'
import PrintLabel from './PrintLabel'

interface LabelPropTypes {
    order: Order,
    print?: boolean
}

const Label = ({ order, print }: LabelPropTypes) => {
  const [boxesArray, setBoxesArray] = useState([...Array(1)])
  const [numberOfBoxes, setNumberOfBoxes] = useState(1)
  const { line_items: lineItems } = order

  const countDonuts = (items: LabelPropTypes['order']['line_items']) => {
    let count = 0
    Object.entries(items).forEach((item) => {
      count += item[1].quantity
    })
    return count
  }

  useEffect(() => {
    const roundedBoxes = Math.ceil(countDonuts(lineItems) / 9)
    setNumberOfBoxes(roundedBoxes)
    setBoxesArray([...Array(roundedBoxes)])
  }, [lineItems])

  const nameReplacer = (name: string) => name.replace('</br>', ' ')

  return (
    <div className={print ? undefined : 'boxLabel mx-auto my-2 pt-1 bg-white h-labelHeight w-labelWidth rounded-xl shadow-lg'}>
      {print ? boxesArray.map((v, index) => (
        <PrintLabel
          key={`${order.id}${Math.random()}`}
          addQuantityLabel={numberOfBoxes > 1 ? `${index + 1} of ${numberOfBoxes}` : undefined}
          countDonuts={countDonuts}
          nameReplacer={nameReplacer}
          order={order}
        />
      )) : (
        <PrintLabel
          key={order.id}
          countDonuts={countDonuts}
          nameReplacer={nameReplacer}
          order={order}
        />
      )}
    </div>
  )
}

Label.defaultProps = {
  print: false,
}

export default Label

import Image from 'next/image'
import labelDobot from '../../../public/images/BNWDobot.png'
import labelLogo from '../../../public/images/LogoText.png'
import { Order } from '../../Orders/Order.types'
import { capitalise } from '../../../shared/helper'
import { sortByDonutName } from '../../../shared/sorting'

interface LabelPropTypes {
    addQuantityLabel?: string,
    countDonuts: (items: LabelPropTypes['order']['line_items']) => number,
    nameReplacer: (name: string) => string,
    order: Order
}

const PrintLabel = ({
  addQuantityLabel, countDonuts, nameReplacer, order,
}: LabelPropTypes) => {
  const {
    customer_note: customerNote, line_items: lineItems, shipping, id,
  } = order

  return (
    <div className="boxLabel flex flex-row relative h-labelPrintHeight w-labelPrintWidth mx-2 align-middle mt-2" id="label">
      <div className="w-9 ml-1">
        <Image alt="Dobot" src={labelDobot} />
      </div>
      <p className="absolute top-10 text-black text-md font-display ml-1">{id}</p>
      <div className="absolute flex flex-col w-full bottom-2 font-mono tinyText ml-1">
        <p className="-mb-1">{`${capitalise(shipping.first_name)} ${capitalise(shipping.last_name)}`}</p>
        <p className="-mb-1">{`${capitalise(shipping.address_1)}`}</p>
        {/* {order.shipping.address_2 && <p>{`${order.shipping.address_2},`}</p>} */}
        <p>{`${capitalise(shipping.city)}, ${shipping.postcode}`}</p>
      </div>
      <div
        className="veryTinyText absolute right-1 font-mono flex flex-col w-2/3 h-1/4 align-bottom items-end justify-start text-right"
      >
        {Object.entries(lineItems).sort(sortByDonutName).reverse().map((item) => (
          <p key={item[1].name}>
            {`${item[1].quantity} ${nameReplacer(item[1].name)}`}
          </p>
        ))}
      </div>
      <p className="absolute labelText -bottom-1 -right-1">{countDonuts(lineItems)}</p>
      <p className="absolute labelText font-mono italic m-0 p-0 left-0 bottom-0 ml-1 w-2/3 leading-none">{customerNote}</p>
      <p className="absolute labelText font-mono m-0 p-0 left-0 -bottom-0.5 ml-1">{addQuantityLabel}</p>
      {!addQuantityLabel && (
      <div className="absolute w-16 right-0 bottom-0">
        <Image alt="Donut" src={labelLogo} />
      </div>
      )}
    </div>
  )
}

PrintLabel.defaultProps = {
  addQuantityLabel: '',
}

export default PrintLabel

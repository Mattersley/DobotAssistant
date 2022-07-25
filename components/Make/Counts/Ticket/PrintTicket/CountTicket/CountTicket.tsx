import Image from 'next/image'
import { format } from 'date-fns'
import labelDobot from '../../../../../../public/images/BNWDobot.png'
import { PrintTicketTypes } from '../PrintTicket'
import { ProductType } from '../../../Counts'

interface CountTicketPropTypes {
    doughs: { [p: string]: number } | undefined,
    donutTypes: PrintTicketTypes['separatedProducts'],
    nextDelivery: Date | undefined
}

const CountTicket = ({ doughs, donutTypes, nextDelivery }: CountTicketPropTypes) => {
  const quantList = (product: [string, ProductType]) => (
    <div
      key={product[1].name}
      className="self-start flex flex-row text-left veryTinyText justify-start font-mono"
    >
      <p className="mr-4">{product[1].quantity}</p>
      <p className="left-4">{product[1].name.replace('</br>', ' ')}</p>
    </div>
  )

  return (
    <>
      <div className="w-9 ml-2">
        <Image alt="Dobot" src={labelDobot} />
      </div>

      <p className="ml-2 font-mono text-sm mb-2">{format(nextDelivery as Date, 'EEE do MMM yyyy')}</p>
      <div className="w-full ml-2">
        {Object.entries(donutTypes.dough2Donuts).map((product) => (quantList(product)))}
        <div className="mx-auto border border-b border-t-0 border-gray-500 w-2/3 my-2" />
        {Object.entries(donutTypes.dough1Donuts).map((product) => (quantList(product)))}
        <div className="mx-auto border border-b border-t-0 border-gray-500 w-2/3 my-2" />
        {Object.entries(donutTypes.otherDonuts).map((product) => (quantList(product)))}
        <div className="mx-auto border border-b border-t-0 border-gray-500 w-2/3 mt-2 mb-3" />

        <div className="mx-auto leading-none">
          {doughs && Object.entries(doughs).map((dough) => (
            <div
              key={dough[0]}
              className="tinyText self-start flex flex-row text-left justify-start font-mono font-bold"
            >
              <p className="mr-4">{dough[1]}</p>
              <p className="left-4">{dough[0].replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, (c) => c.toUpperCase())}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default CountTicket

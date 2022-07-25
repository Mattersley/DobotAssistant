import { format } from 'date-fns'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { OrderContextProps } from '../../context/OrderContext/orderContext.types'
import Tooltip from '../Layout/Tooltip/Tooltip'

interface DeliveryStepsPropTypes {
  ordersByDeliveryDate: OrderContextProps['ordersByDeliveryDate']
  routeInfo: OrderContextProps['routeInfo']
  nextDeliveryDateFromMaster: Date | undefined
}

const DeliverySteps = ({ ordersByDeliveryDate, routeInfo, nextDeliveryDateFromMaster }: DeliveryStepsPropTypes) => {
  const findOrderIDAndAddress = (roadName: string): Array<string | number | undefined> => {
    const details: Array<string | number | undefined> = []
    if (ordersByDeliveryDate) {
      Object.values(ordersByDeliveryDate[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')]).forEach((order) => {
        if (order.shipping.address_1?.toLowerCase().includes(roadName.toLowerCase())) {
          details.push(order.id, order.encodedAddress, order.customer_note)
        } else if (roadName === 'Road name from settings') {
          details.push(0, 'Your Business Name, and Address')
        }
      })
    } return details
  }

  // TODO: Complete woocommerce order on delivered

  return (
    <div className="mx-6">
      {routeInfo?.[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')] && Object.values(routeInfo[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')].trips).map((trip) => (Object.values(trip.legs).map((leg, index) => (
        <div key={leg && `${leg.summary}${leg.distance}`} className="relative mt-4 pr-24 flex flex-row gap-1">
          <div className="flex flex-col">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full shadow bg-blue-50/75 justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-donutPurple hover:text-white hover:bg-donutPink focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    {Object.values(leg.steps).map((step, idx) => (idx === Object.keys(leg.steps).length - 1
                                        && (
                                        <div key={step.name} className="flex flex-row">
                                          <p className="font-bold mr-3">
                                            {findOrderIDAndAddress(step.name)[0] !== 0
                                                && `Order ${findOrderIDAndAddress(step.name)[0]}`}
                                            {findOrderIDAndAddress(step.name)[0] === 0 && 'Return'}
                                          </p>
                                          <p>{decodeURI(findOrderIDAndAddress(step.name)[1] as string)}</p>
                                        </div>
                                        )))}
                    <p>
                      {Math.round(leg.distance / 1000)}
                      {' '}
                      km
                    </p>
                    <p>
                      {Math.round(leg.duration / 60)}
                      {' '}
                      min
                    </p>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-donutPurple`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {Object.values(leg.steps).map((step, idx) => (
                      <div key={step.maneuver.instruction}>
                        <p className="font-bold">{step.name}</p>
                        <div>
                          <p>{`${step.maneuver.type} ${step.maneuver.modifier}`}</p>
                          <p>{step.maneuver.instruction}</p>
                          <div className="font-bold text-donutPurple">
                            {idx === Object.keys(leg.steps).length - 1
                            && (
                            <>
                              {decodeURI(findOrderIDAndAddress(step.name)[1] as string)}
                              <p className="italic text-donutPurple">{findOrderIDAndAddress(step.name)[2]}</p>
                            </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <div className="absolute right-0 w-1/8 flex flex-row gap-1">
            <Tooltip content={'Send "30 min" warning email'} placement="top">
              <button className="shadow bg-donutPink hover:bg-transparent hover:text-donutPink text-white rounded-lg px-2 py-2" type="button">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" stroke="none" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                  <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                  <line x1="3" x2="7" y1="9" y2="9" />
                </svg>
              </button>
            </Tooltip>
            <Tooltip content={'Send "delivered" email'} placement="top">
              <button className="text-sm shadow bg-donutPink hover:bg-transparent hover:text-donutPink text-white rounded-lg px-2 py-2" type="button">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" stroke="none" />
                  <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
                  <line x1="12" x2="20" y1="12" y2="7.5" />
                  <line x1="12" x2="12" y1="12" y2="21" />
                  <line x1="12" x2="4" y1="12" y2="7.5" />
                  <line x1="16" x2="8" y1="5.25" y2="9.75" />
                </svg>
              </button>
            </Tooltip>
          </div>
        </div>
      ))
      ))}
    </div>
  )
}

export default DeliverySteps

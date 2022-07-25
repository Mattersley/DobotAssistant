import {
  Dispatch,
  Fragment, SetStateAction, useContext, useEffect, useState,
} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, TruckIcon } from '@heroicons/react/solid'
import { format, sub } from 'date-fns'
import { OrderContext } from '../../../../context/OrderContext/orderContext'
import { DeliveryDateContext } from '../../../../context/DeliveryDateContext/deliveryDateContext'
import IconBadgeCheck from './DeliveryDayDropdown.svg'

const DeliveryDayDropdown = () => {
  const { deliveryDaysOfOrders } = useContext(OrderContext)
  const { setMasterReferenceDay, nextDeliveryDateFromToday } = useContext(DeliveryDateContext)
  const [selected, setSelected]: [string, Dispatch<SetStateAction<string>>] = useState(() => format(new Date(nextDeliveryDateFromToday as Date), 'd MMMM, yyyy'))

  useEffect(() => {
    setMasterReferenceDay(sub(new Date(selected as string), { days: 1 }))
  }, [selected, setMasterReferenceDay])

  const formattedNextDeliveryDate = (nextDel: Date) => {
    if (nextDel) {
      return format(new Date(nextDel), 'd MMMM, yyyy')
    } return null
  }

  return (
    <div className="w-56 align-middle items-center justify-center">
      <Listbox onChange={setSelected} value={selected}>
        <div className="relative">
          <Listbox.Button className="align-middle items-center flex-row flex w-10 md:w-full shadow-md rounded-lg pl-4 py-2 text-left bg-white cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 md:text-sm">
            <span className="hidden md:block truncate text-donutPurple font-bold text-base w-full">
              {selected === formattedNextDeliveryDate(nextDeliveryDateFromToday as Date) ? (
                <div className="flex flex-row justify-between">
                  <p className="mr-1">{selected}</p>
                  <div className="text-green-700"><IconBadgeCheck /></div>
                </div>
              ) : selected}
            </span>
            <span className="flex align-middle items-center ml-2 pointer-events-none">
              <SelectorIcon
                aria-hidden="true"
                className="hidden md:block w-5 h-5 text-gray-400"
              />
              <TruckIcon
                aria-hidden="true"
                className="md:hidden w-5 h-5 m-0 -ml-3 text-gray-700"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute -ml-28 sm:-ml-0 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {deliveryDaysOfOrders && deliveryDaysOfOrders.map((option) => (
                <Listbox.Option
                  key={option}
                  className={({ active }) => `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`}
                  value={option}
                >
                  {/* eslint-disable-next-line no-shadow */}
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate flex flex-row align-middle items-center`}
                      >
                        {option === formattedNextDeliveryDate(nextDeliveryDateFromToday as Date) ? (
                          <>
                            <p className="mr-1">{option}</p>
                            <div className="text-green-700"><IconBadgeCheck /></div>
                          </>
                        ) : option}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon aria-hidden="true" className="w-5 h-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
              <Listbox.Option
                className={({ active }) => `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4 border-t text-xs flex flex-row align-middle items-center`}
                disabled
                value={null}
              >
                <div className="text-green-700 mr-2 -ml-2"><IconBadgeCheck /></div>
                {' = next delivery date'}

              </Listbox.Option>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default DeliveryDayDropdown

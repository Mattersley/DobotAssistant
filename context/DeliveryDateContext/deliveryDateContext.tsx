import React, {
  createContext, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState,
} from 'react'
import {
  closestTo, nextFriday, nextMonday, nextSaturday, nextSunday, nextThursday, nextTuesday, nextWednesday, sub,
} from 'date-fns'
import Spinner from '../../components/Layout/Spinner/Spinner'
import { DeliveryDateContextProps, DeliveryDateProviderPropTypes } from './deliveryDateContext.types'

export const DeliveryDateContext = createContext({} as DeliveryDateContextProps)
DeliveryDateContext.displayName = 'DeliveryDateContext'

export const DeliveryDateProvider = ({ children }: DeliveryDateProviderPropTypes): JSX.Element => {
  const [nextDeliveryDateFromMaster, setNextDeliveryDateFromMaster]: [undefined | number | Date, Dispatch<SetStateAction<Date | undefined>>] = useState()
  const [nextDeliveryDateFromToday, setNextDeliveryDateFromToday]: [undefined | number | Date, Dispatch<SetStateAction<Date | undefined>>] = useState()
  const [deliveryDays, setDeliveryDays] = useState(['wednesday', 'saturday'])
  const [masterReferenceDay, setMasterReferenceDay] = useState((prevState: any) => {
    if (!masterReferenceDay) {
      return sub(Date.now(), { days: 1 })
    } return prevState
  })
  const [error] = useState('')
  const [loading, setLoading] = useState(false)

  // Takes array of day strings, returns array of next instances of those days (from masterDay) as Dates
  const dateArrayConverter = useCallback((masterDay: Date, deliveryDaysArray: string[]) => {
    const today = masterDay
    const dateArray = [] as Date[]

    const findNext = (nextDate: string) => ({
      monday: nextMonday(today),
      tuesday: nextTuesday(today),
      wednesday: nextWednesday(today),
      thursday: nextThursday(today),
      friday: nextFriday(today),
      saturday: nextSaturday(today),
      sunday: nextSunday(today),
    })[nextDate]

    Object.values(deliveryDaysArray).forEach((day) => {
      dateArray.push(findNext(day) as Date)
    })
    return dateArray
  }, [])

  // Returns the closest delivery day to masterReferenceDay
  const nextDeliveryFromMaster = useCallback((masterDay: Date, deliveryDaysArray: string[]): Date => {
    const findNextDateArray = dateArrayConverter(masterDay, deliveryDaysArray)
    return closestTo(masterDay, findNextDateArray) as Date
  }, [dateArrayConverter])

  const nextDeliveryFromToday = useCallback((deliveryDaysArray: string[]) => {
    const findNextDateArray = dateArrayConverter(sub(Date.now(), { days: 1 }), deliveryDaysArray)
    return closestTo(sub(Date.now(), { days: 1 }), findNextDateArray) as Date
  }, [dateArrayConverter])

  useEffect(() => {
    setLoading(true)
    setNextDeliveryDateFromMaster(nextDeliveryFromMaster(masterReferenceDay, deliveryDays))
    setLoading(false)
  }, [deliveryDays, masterReferenceDay, nextDeliveryFromMaster])

  useEffect(() => {
    setLoading(true)
    setNextDeliveryDateFromToday(nextDeliveryFromToday(deliveryDays))
    setLoading(false)
  }, [deliveryDays, nextDeliveryFromToday])

  const value = useMemo(() => ({
    nextDeliveryDateFromMaster,
    nextDeliveryDateFromToday,
    setDeliveryDays,
    setMasterReferenceDay,
  }), [nextDeliveryDateFromMaster, nextDeliveryDateFromToday])

  return (
    <DeliveryDateContext.Provider value={value}>
      {error && <p>DeliveryDateContext Error</p>}
      {loading ? (
        <div
          className="z-50 flex align-middle justify-center absolute right-0 bg-gradient-to-r from-donutGradientPink to-donutGradientGreen w-full h-screen drop-shadow"
        >
          <div className="my-auto"><Spinner /></div>
        </div>
      ) : children}
    </DeliveryDateContext.Provider>
  )
}

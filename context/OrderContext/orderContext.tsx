import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react'
import { format, isSameDay } from 'date-fns'
import axios from 'axios'
import Spinner from '../../components/Layout/Spinner/Spinner'
import useOrderFetcher from '../../hooks/useOrderFetcher'
import { DeliveryDateContext } from '../DeliveryDateContext/deliveryDateContext'
import { OrderContextProps, OrderProviderPropTypes, OrderProviderStateTypes } from './orderContext.types'
import { Order } from '../../components/Orders/Order.types'
import { capitalise, isValidDate } from '../../shared/helper'
import { sortByDate } from '../../shared/sorting'
import { errorToast } from '../../components/Layout/Toasts/Toasts'

const geocodingPath = 'https://maps.googleapis.com/maps/api/geocode/'
const mapboxGeocodingPath = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const optimisationPath = 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/'

export const OrderContext = createContext({} as OrderContextProps)
OrderContext.displayName = 'OrderContext'

export const OrderProvider = ({ children }: OrderProviderPropTypes): JSX.Element => {
  // Fetch Orders
  const {
    data, isLoading, isError, mutate,
  } = useOrderFetcher('?status=processing')
  const orders: Order[] = data?.data

  // State Init
  const [deliveryDaysOfOrders, setDeliveryDaysOfOrders]: OrderProviderStateTypes['deliveryDays'] = useState()
  const [ordersForNextDeliveryDay, setOrdersForNextDeliveryDay]: OrderProviderStateTypes['ordersForNext'] = useState()
  const [ordersByDeliveryDate, setOrdersByDeliveryDate]: OrderProviderStateTypes['ordersByDeliveryDate'] = useState()
  const [getCoordinatesAndOptimisation, setGetCoordinatesAndOptimisation]: OrderProviderStateTypes['getCoordinatesAndOptimisation'] = useState(false)
  const [routeInfo, setRouteInfo]: OrderProviderStateTypes['routeInfo'] = useState()
  const [optimisationString, setOptimisationString]: OrderProviderStateTypes['optimisationString'] = useState('')
  // TODO: Obtain base address from settings context.
  const [baseAddress, setBaseAddress] = useState('')

  const { nextDeliveryDateFromMaster } = useContext(DeliveryDateContext)

  // Create Unique Delivery Days Array
  useEffect(() => {
    const deliveryDatesArray: string[] = []
    if (orders) {
      Object.entries(orders).forEach((order) => {
        const orderDeliveryDate = Object.values(orders[Number(order[0])].meta_data)
          .filter((el) => el.key === 'Delivery Date')[0] as { id: number, key: string, value: string }
        deliveryDatesArray.push(orderDeliveryDate.value)
      })
      const unique = [...new Set(deliveryDatesArray)]
      setDeliveryDaysOfOrders(unique.sort(sortByDate).reverse())
    }
  }, [orders])

  // Create Orders by Delivery Date Object
  useEffect(() => {
    if (orders) {
      Object.entries(orders).forEach((order) => {
        const orderDeliveryDate = Object.values(orders[Number(order[0])].meta_data)
          .filter((el) => el.key === 'Delivery Date')[0] as { id: number, key: string, value: string }

        const details = {
          ...order[1],
          encodedAddress: encodeURI(`${capitalise(order[1].shipping.address_1)}, ${capitalise(order[1].shipping.city)}, ${capitalise(order[1].shipping.postcode)}`),
          coordinates: null,
        }
        const deliveryDate = orderDeliveryDate.value
        if (!ordersByDeliveryDate) {
          const newObj: { [p: string]: { [p: number]: Order } } = {}
          newObj[deliveryDate] = { ...newObj[deliveryDate], [order[1].id]: details }
          setOrdersByDeliveryDate(newObj as OrderContextProps['ordersByDeliveryDate'])
        }
        if (ordersByDeliveryDate) {
          const newObj: { [p: string]: { [p: number]: Order } } = ordersByDeliveryDate
          if (!ordersByDeliveryDate?.[deliveryDate]?.[order[1].id]?.coordinates) {
            newObj[deliveryDate] = {
              ...ordersByDeliveryDate[deliveryDate],
              [order[1].id]: details,
            }
            setOrdersByDeliveryDate(newObj as OrderContextProps['ordersByDeliveryDate'])
          }
        }
      })
    }
  }, [orders, ordersByDeliveryDate])

  // Geocode Addresses
  useEffect(() => {
    if (ordersByDeliveryDate) {
      const newObj = ordersByDeliveryDate
      Object.keys(ordersByDeliveryDate).map(
        async (date) => {
          Object.entries(ordersByDeliveryDate[date]).map(
            async (order) => {
              if (order[1].coordinates === null) {
                // const res = await axios(`${geocodingPath}json?address=${order[1].encodedAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_KEY}`)
                // console.log('Google Geocoder Ran')
                // if (res.data) {
                //   newObj[date][Number(order[0])].coordinates = res.data.results[0].geometry.location
                //   setOrdersByDeliveryDate(newObj)
                // }

                const mapboxGeocodeResults = await axios(`${mapboxGeocodingPath}${order[1].encodedAddress}.json?autocomplete=false&bbox=-123.881918,48.316431,-123.218619,48.708529&fuzzyMatch=false&types=postcode&country=CA&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
                console.log('Mapbox Geocoder Ran')
                if (mapboxGeocodeResults.data) {
                  newObj[date][Number(order[0])].coordinates = mapboxGeocodeResults.data.features[0].center.toString()
                  setOrdersByDeliveryDate(newObj)
                }
              }
            },
          )
        },
      )
    }
  }, [getCoordinatesAndOptimisation, ordersByDeliveryDate])

  // Create Coordinates String for Optimization API Request
  useEffect(() => {
    // TODO: Set optimization string in state for each delivery date
    if (ordersByDeliveryDate && nextDeliveryDateFromMaster !== undefined && isValidDate(nextDeliveryDateFromMaster)) {
      const ordersForNextDeliveryDate = ordersByDeliveryDate[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')]
      if (ordersForNextDeliveryDate) {
        let coordinatesString = ''
        Object.values(ordersForNextDeliveryDate).forEach((order) => {
          if (order.coordinates) {
            const coordinates = `${order.coordinates};`
            coordinatesString += coordinates
          }
        })
        setOptimisationString(baseAddress + coordinatesString)
      }
    }
  }, [baseAddress, nextDeliveryDateFromMaster, ordersByDeliveryDate])

  // Optimize Route
  useEffect(() => {
    // TODO: Set waypoints and trip in state for each delivery date
    const optimiseRoute = async () => {
      if (getCoordinatesAndOptimisation && optimisationString !== '' && optimisationString.length > 40) {
        const res = await axios(`${optimisationPath}${optimisationString.slice(0, -1)}?source=first&overview=full&geometries=geojson&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
        console.log('Mapbox Optimiser Ran')
        if (!routeInfo?.[format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')]) {
          const newObj = { [format(nextDeliveryDateFromMaster as Date, 'd MMMM, yyyy')]: { waypoints: res.data.waypoints, trips: res.data.trips }, ...routeInfo }
          setRouteInfo(newObj)
        }
      }
      if (getCoordinatesAndOptimisation && optimisationString.length < 40) {
        errorToast('No coordinates for this date, route unavailable')
      }
    }
    optimiseRoute().catch((err) => console.log(err)).then(() => setGetCoordinatesAndOptimisation(false))
  }, [getCoordinatesAndOptimisation, nextDeliveryDateFromMaster, optimisationString, routeInfo])

  // Orders for next Delivery Date
  useEffect(() => {
    const nextOrdersArray: Order[] = []
    if (orders !== undefined && orders !== null) {
      Object.values(orders).forEach((order: Order) => {
        const findDeliveryDate = Object.values(order.meta_data).filter((el) => el.key === 'Delivery Date')[0] as { id: number, key: string, value: string }
        const deliveryDateOfOrder = new Date(findDeliveryDate.value)
        if (isSameDay(deliveryDateOfOrder, nextDeliveryDateFromMaster as Date)) {
          nextOrdersArray.push(order)
        }
      })
      setOrdersForNextDeliveryDay(nextOrdersArray)
    }
  }, [nextDeliveryDateFromMaster, orders])

  // Set Context Values
  const value = useMemo(() => ({
    orders,
    ordersByDeliveryDate,
    deliveryDaysOfOrders,
    optimisationString,
    ordersForNextDeliveryDay,
    routeInfo,
    setGetCoordinatesAndOptimisation,
    mutate,
  }), [deliveryDaysOfOrders, mutate, optimisationString, orders, ordersByDeliveryDate, ordersForNextDeliveryDay, routeInfo])

  return (
    <OrderContext.Provider value={value}>
      {isError && <p>OrderContext Error</p>}
      {isLoading ? (
        <div
          className="z-50 flex align-middle justify-center absolute right-0 bg-gradient-to-r from-donutGradientPink to-donutGradientGreen w-full h-screen drop-shadow"
        >
          <div className="my-auto"><Spinner /></div>
        </div>
      ) : children}
    </OrderContext.Provider>
  )
}

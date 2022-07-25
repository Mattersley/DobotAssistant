import axios, { AxiosResponse } from 'axios'
import {
  Dispatch,
  SetStateAction, useCallback, useEffect, useState,
} from 'react'

const path = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

interface MapboxGeocoderPropTypes {
    addresses: { [orderID: number]: string }[] | undefined
}

// interface AxiosResType {
//     config: {
//             transitional: { silentJSONParsing: boolean, forcedJSONParsing: boolean, clarifyTimeoutError: boolean },
//             adapter: never,
//             transformRequest: Record<never, never>[],
//             transformResponse: Record<never, never>[],
//             timeout: 0
//         },
//     data: {type: string, query: Record<any, any>[], features: Record<any, any>[], attribution: string},
//     headers: {'cache-control': string, 'content-type': string, 'last-modified': string, 'x-rate-limit-interval': string, 'x-rate-limit-limit': string},
//     request: {listeners: Record<any, any>, onreadystatechange: null, readyState: number, timeout: number, withCredentials: boolean},
//     status: number,
//     statusText: string,
// }

const useMapboxGeocoder = ({ addresses }: MapboxGeocoderPropTypes) => {
  const [coordinates, setCoordinates]: [AxiosResponse[] | undefined, Dispatch<SetStateAction<AxiosResponse[] | undefined>>] = useState()
  const [geocoderLoading, setGeocoderLoading] = useState(false)

  const getCoordinates = useCallback(async () => {
    setGeocoderLoading(true)
    const coordinatesArray: SetStateAction<undefined> | AxiosResponse[] = []
    if (addresses !== undefined) {
      Object.entries(addresses).map(
        async (address) => {
          const extractedAddress = Object.values(address[1]).toString()
          const res = await axios(`${path}${encodeURIComponent(extractedAddress)}.json?country=CA&types=address&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
          console.log('MapboxGeocoder GET ran')
          if (res.data) {
            coordinatesArray.push(res.data.features[0].center)
          }
        },
      )
    }
    setCoordinates(coordinatesArray)
  }, [addresses])

  useEffect(() => {
    if (addresses !== undefined && coordinates === undefined) {
      getCoordinates().then(() => setGeocoderLoading(false))
    }
  }, [addresses, coordinates, getCoordinates])

  return { geocoderLoading, coordinates }
}

export default useMapboxGeocoder

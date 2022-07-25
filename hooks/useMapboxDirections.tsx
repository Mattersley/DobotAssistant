import axios from 'axios'
import useSWR from 'swr'

const path = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/'
export const startLocation = '0, 0'

const useMapboxDirections = (coordinates: string) => {
  const fetcher = (url: string) => axios(
    `${url}${startLocation}${coordinates}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
  )
  const { data, error, mutate } = useSWR(path, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default useMapboxDirections

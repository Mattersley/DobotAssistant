import useSWR from 'swr'
import axios from 'axios'
import { encode } from 'base-64'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext/userContext'

const path = process.env.NEXT_PUBLIC_WOO_ORDER_PATH
const credentials = encode(`${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`)

const useOrderFetcher = (query: string | null) => {
  const { user } = useContext(UserContext)
  const fetcher = (url: string) => {
    if (user && user.emailVerified) {
      return axios(`${url}${query}&per_page=50`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
    } return axios('error', {})
  }

  const { data, error, mutate } = useSWR(path, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default useOrderFetcher

import useSWR from 'swr'
import axios from 'axios'
import { encode } from 'base-64'

const path = process.env.NEXT_PUBLIC_WOO_PRODUCT_PATH
const credentials = encode(`${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`)

const useProductFetcher = () => {
  const fetcher = (url: string) => axios(`${url}?per_page=30&orderBy=slug&order=asc`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })

  const { data, error: productError, mutate: productMutate } = useSWR(path, fetcher)

  return {
    data,
    isLoading: !productError && !data,
    isError: productError,
    productMutate,
  }
}

export default useProductFetcher

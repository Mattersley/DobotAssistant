import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import Spinner from '../components/Layout/Spinner/Spinner'

const useDonutImage = (donutName: string): { url: string; donutImage: JSX.Element } => {
  const [url, setUrl] = useState('')
  const storage = getStorage()

  const whichPhoto = (name: string) => {
    // noinspection NonAsciiCharacters
    const donutSKUs = ({
      'Image1': 'Image1.png',
      default: 'DobotLoading.gif',
    })

    return donutSKUs[name as keyof typeof donutSKUs] || donutSKUs.default
  }

  const pathReference = ref(storage, `DonutImages/${whichPhoto(donutName)}`)

  getDownloadURL(pathReference)
    .then((downloadURL) => {
      setUrl(downloadURL)
    })
    .catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found':
          throw Error('Image not found')
        case 'storage/unauthorized':
          throw Error('Unauthorized to download image')
        case 'storage/unknown':
          throw Error('Unknown error occurred')
        default:
          throw Error('Error')
      }
    })

  const donutImage = (
    <div>
      {url === '' ? (
        <div className="w-full h-1/4 flex align-middle items-center justify-center mx-auto my-6">
          <Spinner
            relative
          />
        </div>
      ) : <img alt="Donut" src={url} />}
    </div>
  )

  return { url, donutImage }
}

export default useDonutImage

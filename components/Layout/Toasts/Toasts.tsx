import { toast } from 'react-hot-toast'
import { XIcon } from '@heroicons/react/solid'
import React from 'react'

export const errorToast = (errorMessage: string) => toast.error((t) => (
  <span className="ml-4 flex flex-row">
    <b className="mr-2">Error: </b>
    {errorMessage}
    <div className="ml-5 border-r" />
    <button className="flex border-none align-middle items-center justify-center" onClick={() => toast.dismiss(t.id)} type="button">
      <XIcon className="ml-4" width={22} />
    </button>
  </span>
), { duration: 1000000 })

export const successToast = (successMessage: string) => toast.success(successMessage)

import React, { useState } from 'react'

const EmailVerificationBox = () => {
  const [code, setCode] = useState('')

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setCode(event.target.value)
  }

  const handleCode = () => {
    console.log(code)
  }

  const handleResend = () => {
    console.log('resend')
  }

  return (
    <div className="text-right w-full flex flex-col align-middle items-center justify-center">
      <p className="mr-4 font-bold text-lime-500">Please check your inbox to verify your email address</p>
      <div className="flex flex-row mx-auto">
        <input
          aria-label="Email Verification Code"
          className="mt-2 appearance-none relative block shadow-lg w-full px-3 py-2 border border-r-0 border-lime-500 placeholder-lime-500 text-lime-500 rounded-l focus:outline-none focus:ring-lime-600 focus:border-lime-600 focus:z-10 sm:text-sm"
          id="emailVerificationCode"
          name="emailVerificationCode"
          onChange={handleChange}
          placeholder="Enter Code"
          type="text"
        />
        <button
          className="mt-2 rounded-r relative block shadow-lg w-1/2 border border-transparent text-xs font-medium text-white bg-lime-500 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-600e"
          onClick={handleCode}
          type="button"
        >
          Verify
        </button>
      </div>
      <button
        className="relative flex align-middle items-center justify-between py-2 px-4 border border-transparent text-xs font-medium text-lime-900 hover:text-lime-500"
        onClick={handleResend}
        type="submit"
      >
        Didn&apos;t receive the code? Resend here
      </button>
    </div>
  )
}

export default EmailVerificationBox

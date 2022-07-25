import { ArrowCircleRightIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { createUserWithEmailAndPassword, sendEmailVerification } from '@firebase/auth'
import { auth } from '../../firebase/initFirebase'
import { DobotAssistantLogo, DobotLogo } from './LoginForm.svg'
import { errorToast } from '../Layout/Toasts/Toasts'

const RegisterForm = (): JSX.Element => {
  const [values, setValues] = useState({ email: '', password: '' })
  const [showVerifyMessage, setShowVerifyMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event: { preventDefault: () => void }) => {
    if (event) event.preventDefault()
    if (values.email.endsWith('@yourdomain.com')) {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const { user } = userCredential
          sendEmailVerification(user).then(() => setShowVerifyMessage(true))
        })
        .catch((error) => {
          const { message } = error
          setErrorMessage(message)
          if (errorMessage) errorToast(errorMessage)
        })
    } else {
      setErrorMessage('You are not permitted to sign up')
    }
  }

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setValues((vals) => ({
      ...vals,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <div>
      <div className="md:hidden fixed p-8 w-screen h-screen top-0 left-0 bg-gradient-to-r from-donutGradientPink to-donutGradientGreen z-0" />
      <div className="align-middle h-full max-w-md w-md">
        <div className="align-middle flex flex-col justify-center mx-auto">
          <DobotLogo className="mx-auto filter drop-shadow-lg" height="100px" width="120px" />
          <DobotAssistantLogo className="filter p-1 drop-shadow-2xl mt-4 mx-auto drop-shadow-2xl" height="70px" width="400" />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        {showVerifyMessage
          ? <p>Thanks for registering! Please check your email to verify your account</p>
          : (
            <form action="#" className="mt-8 space-y-6" method="POST">
              <input defaultValue="true" name="remember" type="hidden" />
              <div className="rounded-md shadow-md -space-y-px">
                <div>
                  <label className="sr-only" htmlFor="email-address">
                    Email address
                  </label>
                  <input
                    autoComplete="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-donutPink placeholder-donutPink text-donutPurple rounded-t-md focus:outline-none focus:ring-donutPink focus:border-donutPurple focus:z-10 sm:text-sm"
                    id="register-email-address"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    type="email"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <input
                    autoComplete="current-password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-donutPink placeholder-donutPink text-donutPurple rounded-b-md focus:outline-none focus:ring-donutPink focus:border-donutPurple focus:z-10 sm:text-sm"
                    id="register-password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    type="password"
                  />
                </div>
              </div>
              <div>
                <button
                  className="shadow-lg group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-donutPink hover:bg-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-donutPurple"
                  onClick={handleSubmit}
                  type="submit"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArrowCircleRightIcon aria-hidden="true" className="h-5 w-5 text-white group-hover:text-white" />
                  </span>
                  Register
                </button>
              </div>
            </form>
          )}
      </div>
    </div>
  )
}

export default RegisterForm

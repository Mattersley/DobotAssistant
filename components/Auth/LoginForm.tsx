import { LockClosedIcon } from '@heroicons/react/solid'
import React, { useContext, useState } from 'react'

import {
  browserSessionPersistence, browserLocalPersistence, sendEmailVerification, setPersistence, signInWithEmailAndPassword, User,
} from 'firebase/auth'
import { auth } from '../../firebase/initFirebase'
import { DobotAssistantLogo, DobotLogo } from './LoginForm.svg'
import { UserContext } from '../../context/UserContext/userContext'
import usePush from '../../hooks/usePush'
import Tooltip from '../Layout/Tooltip/Tooltip'
import EmailVerificationBox from './EmailVerificationBox'

const LoginForm = (): JSX.Element => {
  const [values, setValues] = useState({ email: '', password: '', checked: false })
  const [errorMessage, setErrorMessage] = useState(null)
  const push = usePush()
  const { setUser, verified, setVerified } = useContext(UserContext)

  const errorCodeToMessage = (code: string) => {
    const codes: Record<string, string> = {
      'auth/user-not-found': 'Incorrect email address',
      'auth/network-request-failed': 'No network connection',
      'auth/too-many-requests': 'Account locked. Try again later',
      'auth/invalid-email': 'Invalid email address',
      'auth/invalid-password': 'Incorrect password',
      'auth/wrong-password': 'Incorrect password',
      default: code.replace('auth/', ''),
    }
    return codes[code] || codes.default
  }

  const persistenceType = () => {
    if (values.checked) return browserLocalPersistence
    return browserSessionPersistence
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    if (event) event.preventDefault()
    setPersistence(auth, persistenceType())
      .then(() => signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const { user } = userCredential
          if (user.emailVerified) {
            setUser(user as User)
            push('/').then()
          } else {
            sendEmailVerification(user, null).then(() => setVerified(false))
          }
        })
        .catch((error) => {
          const { code } = error
          setErrorMessage(code)
        })
        .catch((error) => {
          const { code } = error
          setErrorMessage(code)
        }))
  }

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setValues((vals) => ({
      ...vals,
      [event.target.name]: event.target.value,
    }))
  }

  const handleChecked = () => {
    setValues((vals) => ({ ...vals, checked: !values.checked }))
  }

  return (
    <div>
      <div className="lg:hidden fixed p-8 w-screen h-screen top-0 left-0 bg-gradient-to-r from-donutGradientPink to-donutGradientGreen z-0" />
      <div className="align-middle h-full max-w-md w-md">
        <div className="align-top flex flex-col justify-center mx-auto">
          <DobotLogo className="mx-auto filter drop-shadow-lg" height="100px" width="120px" />
          <DobotAssistantLogo className="filter p-1 mt-4 mx-auto drop-shadow-2xl" height="70" width="400" />
          {errorMessage && <p className="mx-auto text-red-500">{errorCodeToMessage(errorMessage)}</p>}
          {!verified && <EmailVerificationBox />}
        </div>

        <form action="#" className="mt-8 mx-10 sm:mx-0 space-y-6" method="POST">

          <input defaultValue="true" name="remember" type="hidden" />
          <div className="rounded-md shadow-md -space-y-px">
            <div>
              <label className="sr-only" htmlFor="email-address">
                Email address
              </label>
              <input
                aria-label="Email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-donutPink placeholder-donutPink text-donutPurple rounded-t-md focus:outline-none focus:ring-donutPink focus:border-donutPurple focus:z-10 sm:text-sm"
                id="email-address"
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
                aria-label="Password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-donutPink placeholder-donutPink text-donutPurple rounded-b-md focus:outline-none focus:ring-donutPink focus:border-donutPurple focus:z-10 sm:text-sm"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
                type="password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center">
              <Tooltip content="Checking this box will keep you signed in across tabs until you manually sign out. Do not use this if other people have access to your computer" placement="right">
                <input
                  className="h-4 w-4 text-donutPurple focus:ring-donutPurple border-donutPink rounded"
                  id="remember-me"
                  onClick={handleChecked}
                  type="checkbox"
                />
              </Tooltip>
              <label className="ml-2 block text-sm text-gray-900" htmlFor="remember-me">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a className="font-medium text-donutPurple hover:text-donutPink" href="/forgot">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              className="shadow-lg group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-donutPink hover:bg-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-donutPurple"
              onClick={handleSubmit}
              type="submit"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon aria-hidden="true" className="h-5 w-5 text-white group-hover:text-white" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm

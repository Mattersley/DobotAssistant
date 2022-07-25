import React, {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react'
import {
  onIdTokenChanged, signOut, User,
} from 'firebase/auth'
import nookies from 'nookies'

import { auth } from '../../firebase/initFirebase'
import { errorToast } from '../../components/Layout/Toasts/Toasts'

import usePush from '../../hooks/usePush'
import Login from '../../pages/admin/login'
import Spinner from '../../components/Layout/Spinner/Spinner'
import UserContextTypes from './userContext.types'

export const UserContext = createContext({} as UserContextTypes['contextProps'])
UserContext.displayName = 'UserContext'

export const UserProvider = ({ children }: UserContextTypes['props']): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(true)
  const push = usePush()

  const notValid = () => {
    setUser(null)
    setVerified(true)
    nookies.destroy(null, 'token')
    nookies.set(null, 'token', '', { path: '/' })
  }

  useEffect(() => {
    setLoading(true)
    return onIdTokenChanged(auth, async (existingUser) => {
      if (!existingUser) {
        notValid()
        push('/')
          .then(() => setLoading(false))
      } else {
        const token = await existingUser.getIdToken()
        if (existingUser.emailVerified) {
          setVerified(true)
          setUser(existingUser as User)
          nookies.destroy(null, 'token')
          nookies.set(null, 'token', token, { path: '/' })
          setLoading(false)
        } if (!existingUser.emailVerified) {
          setVerified(false)
          setLoading(false)
        } setLoading(false)
      }
    })
  }, [push])

  useEffect(() => {
    const handle = setInterval(async () => {
      const userExists = auth.currentUser
      if (userExists) await userExists.getIdToken(true)
    }, 10 * 60 * 1000)

    return () => clearInterval(handle)
  }, [push])

  const signOutUser = useCallback(() => {
    signOut(auth).then(() => {
      notValid()
    }).catch((error) => {
      errorToast(error)
    })
  }, [])

  const value = useMemo(() => ({
    user, setUser, signOutUser, verified, setVerified,
  }), [signOutUser, user, verified])

  const userLayout = () => {
    if (!user) return <Login />
    return children
  }

  return (
    <UserContext.Provider value={value}>
      {loading ? (
        <div
          className="z-50 flex align-middle justify-center absolute right-0 bg-gradient-to-r from-donutGradientPink to-donutGradientGreen w-full h-screen drop-shadow"
        >
          <div className="my-auto"><Spinner /></div>
        </div>
      ) : userLayout()}
    </UserContext.Provider>
  )
}

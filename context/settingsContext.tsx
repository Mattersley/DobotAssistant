import React, {
  createContext, useMemo, useState,
} from 'react'
import Spinner from '../components/Layout/Spinner/Spinner'

interface SettingsProviderPropTypes {
    children: React.ReactElement
}

export const SettingsContext = createContext({})
SettingsContext.displayName = 'SettingsContext'

export const SettingsProvider = ({ children }: SettingsProviderPropTypes): JSX.Element => {
  const [settings, setSettings] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const value = useMemo(() => ({
    settings,
    setSettings,
  }), [settings])

  return (
    <SettingsContext.Provider value={value}>
      {error && <p>SettingsContext Error</p>}
      {loading ? (
        <div
          className="flex align-middle justify-center absolute right-0 bg-gradient-to-r from-donutGradientPink to-donutGradientGreen w-full h-screen drop-shadow"
        >
          <div className="my-auto"><Spinner /></div>
        </div>
      ) : children}
    </SettingsContext.Provider>
  )
}

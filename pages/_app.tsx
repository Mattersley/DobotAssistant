import { AppProps } from 'next/app'

import '../styles/base.css'
import 'regenerator-runtime/runtime'
import 'core-js/stable'
import Head from 'next/head'
import { UserProvider } from '../context/UserContext/userContext'
import Layout from '../components/Layout/Layout'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Dōbot Assistant | Donut Management Suite</title>
    </Head>
    <UserProvider>
      <Layout>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  </>
)

export default MyApp

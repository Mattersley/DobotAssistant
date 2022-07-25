import React from 'react'
import nookies from 'nookies'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import firebaseAdmin from '../../firebase/initFirebaseAdmin'

const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const { uid, email } = token

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    }
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never }
  }
}

const AuthenticatedPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { message } = props

  return (
    <div>
      <h2 className="m-4 text-2xl">Server Side Authentication</h2>
      <p className="ml-4">{message}</p>
    </div>
  )
}

export default AuthenticatedPage

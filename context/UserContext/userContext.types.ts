import { User } from 'firebase/auth'
import React from 'react'

interface UserContextTypes {
    contextProps: {
        user: User | null,
        setUser: (user: User) => void,
        signOutUser: () => void,
        verified: boolean,
        setVerified: (bool: boolean) => void,
    },
    props: {
        children: React.ReactElement
    },
    setUser: (user: User) => void,
    signOutUser: () => void,
    user: User,
}

export default UserContextTypes

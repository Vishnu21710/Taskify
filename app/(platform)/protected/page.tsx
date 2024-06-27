"use client"
import React from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'

type Props = {}

const ProtectedPage = (props: Props) => {

    const {userId} = useAuth()
    const {user, isLoaded, isSignedIn} = useUser()

    if(!isLoaded){
        return <p>Loading</p>
    }

    return (
        <>
            <div>ProtectedPage : {user?.firstName} </div>
            <div>ProtectedPage : {userId} </div>
            <UserButton afterSignOutUrl='/'/>
            
        </>
    )
}

export default ProtectedPage
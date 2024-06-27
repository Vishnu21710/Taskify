"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useOrganizationList } from '@clerk/nextjs'

type Props = {}

const OrgControl = (props: Props) => {

    const params = useParams()
    const {setActive} = useOrganizationList()

    useEffect(()=>{

        if(!setActive) return

        setActive({
            organization: params.id as string
        })

    }, [setActive, params.id])

    return (
        null
    )
}

export default OrgControl
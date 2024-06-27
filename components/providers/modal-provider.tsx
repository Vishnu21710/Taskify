"use client"

import React, { useEffect, useState } from 'react'
import CardModal from '@/components/modals/card-modal'
import ProModal from '@/components/modals/pro-modal'

type Props = {}

const ModalProvider = (props: Props) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
    }

    return (
        <div>
            <CardModal/>
            <ProModal/>
        </div>
    )
}

export default ModalProvider
import { SignIn } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

type Props = {
  params: any
  searchParams: any
}

const page = ({params, searchParams}: Props) => {


  

  return (
    <div >
        <SignIn />
    </div>
  )
}

export default page
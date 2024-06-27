import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const ClerkLayout = ({children}: Props) => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        {children}
    </div>
  )
}

export default ClerkLayout
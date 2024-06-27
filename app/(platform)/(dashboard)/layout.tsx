import { Navbar } from '@/app/(marketing)/_components/Navbar'
import React, { ReactNode } from 'react'
import DashboardNavbar from './_components/DashboardNavbar'

type Props = {
    children: ReactNode
}

const DashboardLayout = ({children}: Props) => {
  return (
    <div className='h-screen'>
        <DashboardNavbar/>
        {children}
    </div>
  )
}

export default DashboardLayout
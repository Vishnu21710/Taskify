import React, { ReactNode } from 'react'
import { Navbar } from './_components/Navbar'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Footer } from './_components/Footer'
import { ClerkProvider } from '@clerk/nextjs'

type Props = {
    children: ReactNode
}

const poppins = Poppins({ subsets: ["latin", 'latin-ext'], weight: ["100", "200", "300", "400"] })

const MarketingLayout = ({ children }: Props) => {
    return (
        <div className={cn('h-screen bg-slate-100', poppins.className)}>
            <Navbar />
                <main className='pb-20 pt-40 bg-slate-100'>
                    {children}
                </main>
            <Footer />
        </div>
    )
}

export default MarketingLayout
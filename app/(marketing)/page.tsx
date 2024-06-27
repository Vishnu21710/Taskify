import React from 'react'
import { Medal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {}

const MarketingPage = (props: Props) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center flex-col'>
                <div className='mb-4 flex items-center border font-semibold shadow-sm bg-amber-100 text-amber-700 uppercase p-4 rounded-full'>
                    <Medal className='h-6 w-6 mr-6' />
                    No 1 Task Management
                </div>
                <h1 className='text-3xl md:text-5xl font-extrabold text-center text-neutral-800 mb-6'>
                    Taskify helps team move
                </h1>
                    <div className='text-3xl md:text-4xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 pb-4 w-fit rounded-md'>
                        Work forward.
                    </div>
            </div>
        <div className='text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto'>
            Collaborate, Manage Projects and reach new productivity peaks. From high rises to the home office, the way your team work is unique - acomplish it all with Taskify
        </div>
        <Button className='mt-6' size={'lg'} asChild>
            <Link href={'/sign-up'}>Get Taskify for free</Link>
        </Button>
        </div>
    )
}

export default MarketingPage
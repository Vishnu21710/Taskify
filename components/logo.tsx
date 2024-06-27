import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import localFont from 'next/font/local'

const headingFont = localFont({
    src: "../public/font.woff2"
})

type Props = {}

const Logo = (props: Props) => {
    return (
        <Link href={'/'} className='mt-2'>
            <div className='hover:opacity-75 transition items-center hidden md:flex '>
                <Image src={'/next.svg'} width={30} height={30} alt='logo' />
                <p className={cn('text-lg text-neutral-700 pb-1', headingFont.className)}>Taskify</p>
            </div>
        </Link>
    )
}

export default Logo
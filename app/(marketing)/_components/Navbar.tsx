import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

export const Navbar = (props: Props) => {
  return (
    <div className='fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
        <div className='md:max-w-6xl mx-auto flex items-center w-full justify-between'>
                <Logo/>
                <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
                        <Button asChild size={"sm"} variant={"outline"}>
                            <Link href={'/sign-in'}>Login</Link>
                        </Button>
                        <Button asChild size={'sm'} variant={"default"}>
                            <Link href={'sign-up'}>Get Taskify For Free</Link>
                        </Button>
                </div>
        </div>
    </div>
  )
}

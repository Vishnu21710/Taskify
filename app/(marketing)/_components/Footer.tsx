import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

export const Footer = (props: Props) => {
  return (
    <div className='fixed bottom-0 w-full  p-4 border-t bg-slate-100 flex items-center'>
        <div className='md:max-w-6xl mx-auto flex items-center w-full justify-between'>
                <Logo/>
                <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
                        <Button  className={"font-bold"} size={"sm"} variant={"ghost"}>
                            Privacy Policy
                        </Button>
                        <Button  className={"font-bold"} size={'sm'} variant={"ghost"}>
                            Terms & Service
                        </Button>
                </div>
        </div>
    </div>
  )
}

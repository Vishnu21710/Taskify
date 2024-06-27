"use client"
import { useProModal } from '@/hooks/use-pro-modal'
import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { stripeRedirect } from '@/actions/stripe-redirect'
import { toast } from 'sonner'

type Props = {}

const ProModal = (props: Props) => {

    const {execute, data, isLoading, error, fieldErrors} = useAction(stripeRedirect, {
        onSuccess:(data)=>{
            window.location.href= data
            toast.success("Successfully Upgraded To Taskify Pro")
        },
        onError: (error)=>toast.error(error)
    })

    const onClick = ()=>{
        execute({})
    }

    console.log(error, fieldErrors, 'stripe error');
    

    const proModal = useProModal()
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent className='max-w-md p-0 overflow-hidden'>
                <div className='aspect-video relative flex items-center justify-center'>
                    <Image src={'/rocket.jpg'} fill className='object-cover' alt='Vercel' />
                </div>
                <div className='text-neutral-700 p-6 mx-auto space-y-6'>
                    <h1 className='font-semibold text-xl'>Upgrade to Taskify pro today</h1>
                    <p className='text-xs font-semibold text-neutral-600'>Explore the best of Taskify</p>
                    <div className='pl-3'>
                        <ul className='text-sm list-disc '>
                            <li>Unlimited Board</li>
                            <li>Advanced Checklists</li>
                            <li>Admin and Security Features</li>
                            <li>And More</li>
                        </ul>
                    </div>
                    <Button disabled={isLoading} onClick={onClick} className='w-full' variant={"primary"} >
                        Upgrade
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProModal
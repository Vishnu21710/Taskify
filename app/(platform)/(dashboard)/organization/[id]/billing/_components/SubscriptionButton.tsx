"use client"
import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { cn } from '@/lib/utils'
import { InfoIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    isPro: boolean
}

const SubscriptionButton = ({ isPro }: Props) => {

    const proModal = useProModal()

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data
        },
        onError: (error) => toast.error(error)
    })

    const onClick = () => {
        if (isPro) {
            execute({})
        } else {
            proModal.onOpen()
        }
    }


    return (
        <div className=''>
            <Button onClick={onClick} variant={!isPro ? "destructive" : "default" } disabled={isLoading} className={cn(isPro && 'bg-gradient-to-tr from-purple-500 to-fuchsia-500 text-white')}>
                {isPro ? "Manage Subscription" : <span className='flex items-center gap-x-2'> <InfoIcon className='w-4 h-4 text-sm font-extralight' /> Upgrade to pro</span>}
            </Button>
        </div>
    )
}

export default SubscriptionButton
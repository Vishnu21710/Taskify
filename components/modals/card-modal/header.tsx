"use client"
import { updateCard } from '@/actions/update-card'
import FormInput from '@/components/form/FormInput'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Layout } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

type Props = {
    data: CardWithList
}

const CardHeader = ({ data }: Props) => {
    const [title, setTitle] = useState(data.title)
    const queryClient = useQueryClient()
    const params = useParams()
    const inputRef = useRef<ElementRef<"input">>(null)

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit()
    }
    const { execute: executeCartUpdate } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id]
            })

            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            })
            toast.success(`Card ${data.title} updated`)
        },
        onError: (error)=>toast.error(error)

    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string
        const boardId = params.board_id as string
        if(title === data.title){
            return
        }
        executeCartUpdate({title, boardId, id: data.id})
    }


    return (
        <div className='flex items-start gap-x-3 mb-3 w-full'>
            <Layout className='h-5 w-5 mt-1 text-neutral-700' />
            <div className='w-full'>
                <form action={onSubmit}>
                    <FormInput onBlur={onBlur} ref={inputRef} id='title' name='title' defaultValue={title} className='font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate' />
                </form>
                <p className='text-sm text-muted-foreground '>In List <span className='underline'>{data.list.title}</span></p>
            </div>
        </div>
    )
}

CardHeader.Skeleton = () => (
    <div className='flex items-center gap-x-3 mb-6'>
        <Skeleton className='h-6 w-6 mt-1 bg-neutral-200' />
        <div className=''>
            <Skeleton className='h-6 w-24 mb-1 bg-neutral-200' />
            <Skeleton className='h-4 w-12 bg-neutral-200' />
        </div>
    </div>
)

export default CardHeader
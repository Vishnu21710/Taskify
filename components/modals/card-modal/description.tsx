"use client"

import { updateCard } from '@/actions/update-card'
import FormSubmit from '@/components/form/FormSubmit'
import FormTextArea from '@/components/form/FormTextArea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft, XIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

type Props = {
    data: CardWithList
}

const CardDescription = ({ data }: Props) => {

    const [isEditing, setIsEditing] = useState(false)

    const textAreaRef = useRef<ElementRef<"textarea">>(null)
    const formRef = useRef<ElementRef<"form">>(null)

    const queryClient = useQueryClient()

    const params = useParams()

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => textAreaRef.current?.focus())
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "escape") {
            disableEditing()
        }
    }

    const { execute: executeCardDescriptionUpdate } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id]
            })
            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            })
            toast.success(`Card "${data.title}" description updated.`)
            disableEditing()
        },
        onError: (error) => toast.error(error)
    })

    useOnClickOutside(formRef, disableEditing)
    useEventListener("keydown", onKeyDown)

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string
        const boardId = params.board_id as string

        executeCardDescriptionUpdate({ id: data.id, boardId, description})
    }

    return (
        <div className='flex items-start gap-x-3 w-full'>
            <AlignLeft className='h-5 2-5 mt-0.5 text-neutral-700' />
            <div className='w-full'>
                <p className='font-semibold text-neutral-700 mb-2'>Description</p>
                {isEditing ? (
                    <form action={onSubmit} ref={formRef} className='space-y-2'>
                        <FormTextArea ref={textAreaRef} id="description" name="description" className='w-full mt-2' placeholder='Add more detailed description...' defaultValue={data.description || undefined} />
                        <div className='flex items-center gap-x-2'>
                            <FormSubmit>
                                Save
                            </FormSubmit>
                            <Button type='button' variant={"ghost"} size={"sm"} onClick={disableEditing}>
                                <XIcon />
                            </Button>
                        </div>
                    </form>
                )
                    : (
                        <div role='button' onClick={enableEditing} className='min-h-[78px] bg-neutral-200 text-sm font-medium px-3.5 py-3 rounded-md'>
                            {data.description || "Add a more detailed description"}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

CardDescription.Skeleton = () => (
    <div className='flex items-start gap-x-3 w-full'>
        <Skeleton className='h-6 w-6 bg-neutral-200' />
        <div className='w-full'>
            <Skeleton className='h-6 w-24 mb-2 bg-neutral-200' />
            <Skeleton className='h-[78px] w-full  bg-neutral-200' />
        </div>
    </div>
)

export default CardDescription
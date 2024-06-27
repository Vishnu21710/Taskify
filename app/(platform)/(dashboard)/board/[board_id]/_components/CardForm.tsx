"use client"
import FormSubmit from '@/components/form/FormSubmit'
import FormTextArea from '@/components/form/FormTextArea'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { PlusIcon, XIcon } from 'lucide-react'
import React, { ElementRef, forwardRef, KeyboardEventHandler, useRef } from 'react'
import { useParams } from 'next/navigation'
import { createCard } from '@/actions/create-card'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

type Props = {
    listId: string,
    isEditing: boolean
    enableEditing: () => void
    disableEditing: () => void
}

const CardForm = forwardRef<HTMLTextAreaElement, Props>(({
    disableEditing,
    enableEditing,
    isEditing,
    listId
}, ref) => {

    const { execute: executeCreateCard, fieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" created successfully.`)
            formRef.current?.reset()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const params = useParams()


    const formRef = useRef<ElementRef<"form">>(null)

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing()
        }
    }

   

    useOnClickOutside(formRef, disableEditing)
    useEventListener("keydown", onKeyDown)

    const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            formRef.current?.requestSubmit()
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string
        const boardId = params.board_id as string
        const listId = formData.get("listId") as string



        executeCreateCard({ boardId, listId, title })
    }

    if (isEditing) {
        return (
            <form ref={formRef} action={onSubmit} className='m-1 py-0.5 px-1  '>
                <FormTextArea className='' errors={fieldErrors} id={"title"} name='title' onBlur={()=>{}} ref={ref} onKeyDown={onTextAreaKeyDown} placeholder='Enter a title for this card' />
                <input type="text" hidden id={"listId"} defaultValue={listId} name={"listId"} />
                <div className='flex items-center w-full gap-x-1 pt-4 '>
                    <FormSubmit className=''>
                        Add Card
                    </FormSubmit>
                    <Button type='submit' onClick={disableEditing} variant={"ghost"} size={"sm"}>
                        <XIcon className='h-5 w-5' />
                    </Button>
                </div>

            </form>
        )
    }

    return (
        <div className='p-2 px-2 '>
            <Button className='h-autopx-2 py-1.5 w-full justify-start text-muted-foreground text-sm' size={"sm"} variant={"ghost"} onClick={enableEditing} >
                <PlusIcon className='h-4 w-4 mr-2' />
                Add a card
            </Button>
        </div>
    )
})

CardForm.displayName = "CardForm"

export default CardForm
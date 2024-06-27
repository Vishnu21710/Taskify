"use client"
import { updateList } from '@/actions/update-list'
import FormInput from '@/components/form/FormInput'
import { useAction } from '@/hooks/use-action'
import { list } from '@prisma/client'
import React from 'react'
import { useState, useRef, ElementRef } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import ListOptions from './ListOptions'

type Props = {
    data: list
    onAddCard: ()=>void
}

const ListHeader = ({ data, onAddCard }: Props) => {

    const [title, setTitle] = useState(data.title)
    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            formRef.current?.requestSubmit()
        }
    }

    const { execute } = useAction(updateList, {
        onSuccess: (data) => {
            toast.success(`Renamed to ${data.title}`)
            setTitle(data.title)
            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string
        const boardId = formData.get("boardId") as string
        const id = formData.get("id") as string

        if (title === data.title) {
            return disableEditing()
        }

        execute({
            title,
            boardId,
            id
        })
    }

    const onBlur = ()=>{
        console.log('Called on blur');
        
        formRef.current?.requestSubmit()
    }

    useEventListener("keydown", onKeyDown)

    return (
        <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
            {
                isEditing ? (
                    <form ref={formRef} action={onSubmit} className='flex-1 px-2 '>
                        <input type="hidden" id='id' name='id' value={data.id} />
                        <input type="hidden" id='boardId' name='boardId' value={data.boardId} />
                        <FormInput id='title' ref={inputRef} name='title' onBlur={onBlur} placeholder='Enter List Title' defaultValue={title} className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white' />
                        <button type='submit' hidden></button>
                    </form>
                ) : (
                    <div
                        onClick={enableEditing}
                        className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'
                    >
                        {title}
                    </div>
                )
            }
            <ListOptions data={data} onAddCard={onAddCard}/>
        </div>
    )
}

export default ListHeader
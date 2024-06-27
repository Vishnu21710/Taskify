"use client"
import React, { ElementRef, useRef, useState } from 'react'
import ListWrapper from './ListWrapper'
import { useEventListener, useOnClickOutside, } from 'usehooks-ts'
import FormInput from '@/components/form/FormInput'
import { Plus, XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import FormSubmit from '@/components/form/FormSubmit'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { createList } from '@/actions/create-list'
import { toast } from 'sonner'
type Props = {}

const ListForm = (props: Props) => {


    const [isEditing, setIsEditing] = useState<boolean>(false)

    const router = useRouter()

    const params = useParams()

    

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const enableEditing = () => {
        setIsEditing(true)

        setTimeout(() => {
            inputRef.current?.focus()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const {execute, data, fieldErrors} = useAction(createList, {
        onSuccess: (data)=>{
            toast.success(`List ${data.title} created Successfully`)
            disableEditing()
            router.refresh()
        },
        onError:(error)=>{
            toast.error(error)
        }
    })

    const onSubmit = (formData: FormData)=>{
        const title = formData.get("title") as string
        const boardId = formData.get("boardId") as string

        console.log(title, boardId, 'list create data');
        

        execute({boardId, title})

    }


    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing()
        }
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    if(isEditing){
        return (
            <ListWrapper>
                <form ref={formRef} action={onSubmit} className='w-full  p-3 rounded-md shadow-md bg-white space-y-4 '>
                        <FormInput errors={fieldErrors} ref={inputRef} id='title' name='title' className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition' placeholder='Enter List Title'/>
                        <input  type="hidden" value={params.board_id} name='boardId'/>
                        <div className='flex items-center gap-x-1 opacity-30'>
                            <FormSubmit className=''>
                                Add List
                            </FormSubmit>
                            <Button size={"sm"} variant={"ghost"} onClick={disableEditing}>
                                <XIcon className='h-5 w-5'/>
                            </Button>
                        </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <form action=""  className='w-full px-3 rounded-md bg-white opacity-65 space-y-4 shadow-md'>
                <button onClick={enableEditing} className='w-full bg-white/80 opa hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'>
                    <Plus className='h-4 2-4 mr-2' />
                    Add a list
                </button>
            </form>
        </ListWrapper>
    )
}

export default ListForm
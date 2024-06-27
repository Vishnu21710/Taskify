"use client"
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { board } from '@prisma/client'
import React, { ElementRef, useRef, useState } from 'react'
import { updateBoard } from '@/actions/update-board'
import { useAction } from '@/hooks/use-action'
import { toast } from 'sonner'

type Props = {
  data: board

}

const BoardTitleForm = ({data}: Props) => {

  const {execute} = useAction(updateBoard, {
    onSuccess: (data)=>{
      if(data.title !== title) {
        toast.success(`${data.title} board updated`)
        setTitle(data.title)
      }
      disableEditing()
    },
    onError: (error)=>{
      toast.error(error)
    }
  })

  const  [title, setTitle] = useState<string>(data.title)

  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const disableEditing = () => {
    setIsEditing(false)
  }

  const enableEditing = () => {
    setIsEditing(true)
    // we used settimeout here because the focus and select methods are called immediately before even rendering the form so to execute both of these methods after re rendering we use setTimeout
    setTimeout(() => {

      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const onSubmit = (formData: FormData)=>{
    const title = formData.get("title") as string
    console.log('Submitted a Title : ' + title);
    execute({id:data.id, title})
    
  }

  const onBlur = ()=>{
    formRef.current?.requestSubmit()
  }


  if (isEditing) {
    return (
      <form ref={formRef} action={onSubmit} className='flex items-center gap-x-2'>
        <FormInput ref={inputRef} id='title' name='title' onBlur={onBlur} defaultValue={title} className='text-lg font-bold px-[7px] py-2 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none' />
      </form>
    )
  }


  return (
    <Button onClick={enableEditing} variant={"transparent"} className='font-bold text-lg h-auto w-auto p-1 px-2 cursor-pointer'>{title}</Button>
  )
}

export default BoardTitleForm
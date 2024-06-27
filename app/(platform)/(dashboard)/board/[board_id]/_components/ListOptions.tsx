"use client"
import { list } from '@prisma/client'
import React, { ElementRef, useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, XIcon } from 'lucide-react'
import FormSubmit from '@/components/form/FormSubmit'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/use-action'
import { deleteList } from '@/actions/delete-list'
import { toast } from 'sonner'
import { copyList } from '@/actions/copy-list'

type Props = {
  data: list
  onAddCard: () => void
}

const ListOptions = ({ data, onAddCard }: Props) => {

  const closeRef = useRef<ElementRef<"button">>(null)

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} deleted.`)
      closeRef.current?.click()
    }
  })

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${(data.title.split('-')[0]).trimEnd()}" copied success fully`)
      closeRef.current?.click()
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string
    const boardId = formData.get("boardId") as string

    executeDelete({ id, boardId })
  }

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string
    const boardId = formData.get("boardId") as string

    executeCopy({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant={"ghost"}>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 py-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutral-600 pb-4 '>
          List Actions
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant={"ghost"}>
            <XIcon className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button onClick={onAddCard} className='rounded-none w-full h-auto px-5 justify-start font-normal text-sm' variant={"ghost"}>
          Add Card
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" defaultValue={data.id} />
          <input hidden name="boardId" id="boardId" defaultValue={data.boardId} />
          <FormSubmit variant='ghost' className='rounded-none w-full h-auto px-5 justify-start font-normal text-sm'>
            Copy List...
          </FormSubmit>
        </form>

        <Separator />

        <form action={onDelete}>
          <input hidden name="id" id="id" defaultValue={data.id} />
          <input hidden name="boardId" id="boardId" defaultValue={data.boardId} />
          <FormSubmit variant='ghost' className='rounded-none w-full h-auto px-5 justify-start font-normal text-sm'>
            Delete List
          </FormSubmit>
        </form>

      </PopoverContent>
    </Popover>
  )
}

export default ListOptions
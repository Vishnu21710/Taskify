"use client"
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, XIcon } from 'lucide-react'
import { useAction } from '@/hooks/use-action'
import { deleteBoard } from '@/actions/delete-board'
import { toast } from 'sonner'

type Props = {
    id: string
}

const BoardOptions = ({ id }: Props) => {

    const {execute, isLoading} = useAction(deleteBoard, {
        onError: (error)=>toast.error(error)
    })

    const onDelete = ()=>{
        execute({id})
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"transparent"} className='w-auto h-auto p-2'>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    Board Actions
                </div>
                <PopoverClose asChild >
                    <Button variant={"ghost"} className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' >
                        <XIcon className='w-4 h-4' />
                    </Button>
                </PopoverClose>
                <Button disabled={isLoading}  variant={"destructive"} onClick={onDelete} className='rounded-sm mx-5  w-[87%] h-auto p-2 px-5 font-normal text-sm text-center '>Delete This Board</Button>
            </PopoverContent>
        </Popover>
    )
}

export default BoardOptions
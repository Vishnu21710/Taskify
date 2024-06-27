"use client"
import React, { ElementRef, ReactNode, useRef } from 'react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { createBoard } from '@/actions/create-board'

import FormInput from './FormInput'
import FormSubmit from './FormSubmit'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { toast } from 'sonner'
import FormPicker from './FormPicker'
import { useRouter } from 'next/navigation'
import { useProModal } from '@/hooks/use-pro-modal'

type Props = {
    children: ReactNode,
    side?: "left" | "right" | "top" | "bottom"
    align?: "start" | "center" | "end",
    sideOffset?: number
}

const FormPopover = ({ children, align, side = "bottom", sideOffset = 0 }: Props) => {
    const router = useRouter()
    const proModal = useProModal()
    const closeRef = useRef<ElementRef<"button">>(null)

    const { execute, data, fieldErrors, error, isLoading } = useAction(createBoard, ({
        onSuccess: (data) => {
            console.log(data);

            toast.success("Board Created")
            closeRef.current?.click()
            router.push(`/board/${data.id}`)
        },
        onError: (error) => {
            console.error(error);
            proModal.onOpen()
            toast.error(error)

        }
    }))

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string
        const image = formData.get("image") as string

        console.log(image);
        

        execute({ title, image })
    }

    return (
        <Popover >
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent align={align} className='w-80 pt-3' side={side} sideOffset={sideOffset}>
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    Create Board
                </div>
                <PopoverClose ref={closeRef}>
                    <Button className='h-auto w-auto text-neutral-600 absolute top-2 right-2' variant={"ghost"}>
                        <XIcon className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className='space-y-4'>
                    <FormPicker id="image" errors={fieldErrors} />
                    <div className='space-y-4'>
                        <FormInput errors={fieldErrors} id='title' name='title' label='Board Title' type='text' />
                    </div>
                    <FormSubmit className='w-full'>
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default FormPopover
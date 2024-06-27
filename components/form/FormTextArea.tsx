"use client"
import React, { forwardRef, KeyboardEvent, KeyboardEventHandler } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'
import FormErrors from './FormErrors'
import { useFormStatus } from 'react-dom'
import { useEventListener } from 'usehooks-ts'

type Props = {
    id: string,
    label?: string,
    name?: string,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
    errors?: Record<string, string[] | undefined>
    className?: string
    onBlur?: () => void
    onClick?: () => void
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
    defaultValue?: string
}

const FormTextArea = forwardRef<HTMLTextAreaElement, Props>(({
    id, className, defaultValue, disabled, errors, label, onBlur, onClick, onKeyDown,name, placeholder, required
}, ref) => {

    const {pending} = useFormStatus()


    return (
        <div className='space-y-2 w-full'>
            <div className='space-y-1 w-full'>
                {
                    label ? <Label htmlFor={id} className='text-xs font-semibold text-neutral-700'>{label}</Label> : null
                }
                <Textarea  aria-describedby={`${id}-error`}  defaultValue={defaultValue} onKeyDown={onKeyDown} onBlur={onBlur} onClick={onClick} ref={ref} required={required} placeholder={placeholder} name={name} id={"title"}  disabled={pending || disabled} className={cn("resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm", className)}/>
                <FormErrors id={id} errors={errors}/>
            </div>
        </div>
    )
})

FormTextArea.displayName = "FormTextArea"

export default FormTextArea
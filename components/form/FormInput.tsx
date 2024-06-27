"use client"
import React, { forwardRef, HTMLInputTypeAttribute } from 'react'
import { useFormStatus } from 'react-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import FormErrors from './FormErrors'


type Props = {
    id: string,
    label?: string,
    type?: HTMLInputTypeAttribute,
    placeholder?: string
    disabled?: boolean
    errors?: Record<string, string[] | undefined>
    name?: string
    className?: string
    defaultValue?: string
    onBlur?: () => void
    required?:boolean
}

const FormInput = forwardRef<HTMLInputElement, Props>(({
    id,
    className,
    defaultValue,
    disabled,
    errors,
    label,
    onBlur,
    name,
    placeholder,
    type,
    required
}, ref) => {
    const { pending } = useFormStatus()
    return (
        <div className='space-y-2'>
            <div className='space-y-1'>
                {
                    label ? (
                        <Label htmlFor={id} className='text-xs font-semibold text-neutral-700'>
                            {label}
                        </Label>
                    ) :
                        null
                }
                <Input
                 name={name}
                 className={cn('text-sm px-2 py-1 h-7', className)} aria-describedby={`${id}-error`} onBlur={onBlur} defaultValue={defaultValue} ref={ref} required={required} placeholder={placeholder} type={type} disabled={pending || disabled}/>
            </div>
            <FormErrors id={id} errors={errors}/>
        </div>
    )
})

FormInput.displayName = "FormInput"

export default FormInput
import React, { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '@/components/ui/button'


type Props = {
    children?: ReactNode,
    disabled?: boolean
    className?: string
    variant?: "default" | "destructive" | "outline" | "ghost" | "link" | "primary"
    size?: "default" | "sm" | "lg" | "icon" | "xs"
}



const FormSubmit = ({children, className, disabled, variant="primary", size}: Props) => {
  
    const  {pending} = useFormStatus()

    return (
    <Button type='submit' size={size} disabled={pending || disabled} variant={variant} className={cn(className)}>
        {children}
    </Button>
  )
}

export default FormSubmit
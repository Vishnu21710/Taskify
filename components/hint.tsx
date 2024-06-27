import React, { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Props = {
    children: ReactNode,
    desctiption: string
    side?: "left" | "right" | "top" | "bottom"
    sideOffset: number
}

const Hint = ({children, desctiption, sideOffset=0, side="bottom"}: Props) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={0}>
            <TooltipTrigger>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} sideOffset={sideOffset} className='text-xs max-w-[220px] break-words'>
                {desctiption}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default Hint
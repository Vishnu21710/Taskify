import { auditlog } from '@prisma/client'
import React from 'react'
import {generateLogMessage} from "@/lib/generic-log-message"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {format} from "date-fns"

type Props = {
    data: auditlog
}

const ActivityItem = ({data}: Props) => {
  return (
    <li className='flex items-center gap-x-2'>
        <Avatar className='w-8 h-8'>
            <AvatarImage src={data?.userImage || ""}/>
        </Avatar>
        <div className='flex flex-col space-y-0.5'>
                <p className='text-sm text-muted-foreground'>
                    <span className='font-semibold lowercase text-neutral-700'>
                        {data.userName}
                    </span> {generateLogMessage(data)}
                </p>
                <p className='text-xs text-muted-foreground'>
                    {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
                </p>
        </div>
    </li >
  )
}

export default ActivityItem
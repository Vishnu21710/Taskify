"use client"

import ActivityItem from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'
import { auditlog } from '@prisma/client'
import { ActivityIcon } from 'lucide-react'
import React from 'react'

type Props = {
    data: auditlog[]
}

const Activity = ({data}: Props) => {

    
    return (
        <div className='flex items-center gap-x-3 w-full'>
            <ActivityIcon className='w-5 h-5 mt-0.5 text-neutral-700'/>
            <div className='w-full '>
                <p className='font-semibold text-neutral-700 mb-2'>Activity</p>

                        <ol className='mt-2 space-y-4'>
                            {
                                data.map((log)=>(
                                    <ActivityItem key={log.id} data={log}/>
                                ))
                            }
                        </ol>
            </div>
        </div>
    )
}

Activity.Skeleton = () => (
    <div className='w-full flex items-start gap-x-3'>
        <Skeleton className='bg-neutral-200 h-6 w-6 mb-2' />
        <div className='w-full'>
            <Skeleton className='bg-neutral-200 h-6 w-24 mb-2' />
            <Skeleton className='bg-neutral-200 h-10 w-full' />
        </div>
    </div>
)

export default Activity
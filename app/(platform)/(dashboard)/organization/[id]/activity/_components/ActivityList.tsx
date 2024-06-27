import ActivityItem from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const ActivityList = async (props: Props) => {
    const { orgId } = auth()

    if (!orgId) {
        redirect('/select-org')
    }

    const auditLogs = await db.auditlog.findMany({
        where:{
            orgId
        },
        orderBy:{
            createdAt: "desc"
        }
    })

    return (
        <ol className='space-y-4 mt-4'>
            <p className='hidden last:block text-xs text-center'>No Activity present in this organization.</p>
            {
                auditLogs.map(log=>(
                    <ActivityItem key={log.id} data={log}/>
                ))
            }
        </ol>
    )
}

ActivityList.Skeleton = ()=>(
    <ol className='space-y-4 mt-4'>
        <Skeleton className='w-[80%] h-14'/>
        <Skeleton className='w-[50%] h-14'/>
        <Skeleton className='w-[70%] h-14'/>
        <Skeleton className='w-[80%] h-14'/>
        <Skeleton className='w-[65%] h-14'/>
        <Skeleton className='w-[80%] h-14'/>
        <Skeleton className='w-[80%] h-14'/>
    </ol>
)

export default ActivityList
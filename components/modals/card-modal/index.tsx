"use client"

import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCardModal } from '@/hooks/use-card-modal'
import { useQuery } from '@tanstack/react-query'
import { CardWithList } from '@/types'
import { fetcher } from '@/lib/fetcher'
import CardHeader from './header'
import { Description } from '@radix-ui/react-dialog'
import CardDescription from './description'
import CardActions from './actions'
import { auditlog } from '@prisma/client'
import Activity from './activity'

type Props = {}

const CardModal = (props: Props) => {

  const id = useCardModal((state)=>state.id)
  const isOpen = useCardModal((state)=>state.isOpen)
  const onClose = useCardModal((state)=>state.onClose)  

  const {data:cardData, error} =  useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: ()=>fetcher(`http://localhost:3005/api/cards/${id}`)
  })

  const {data:auditLogsData} =  useQuery<{auditLogs:auditlog[]}>({
    queryKey: ["card-logs", id],
    queryFn: ()=>fetcher(`http://localhost:3005/api/cards/${id}/logs`)
  })

  

  return (
    <Dialog
      open={isOpen} onOpenChange={onClose}
    >
      <DialogContent>
        {cardData ? <CardHeader data={cardData}/>  : <CardHeader.Skeleton/>}
        <div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
            <div className='col-span-3 '>
              <div className='w-full space-y-6'>
                {
                  !cardData ? <CardDescription.Skeleton/> : <CardDescription data={cardData}/>
                }
                {
                  !auditLogsData ? <Activity.Skeleton/> : <Activity data={auditLogsData.auditLogs}/>
                }
              </div>
            </div>
           {cardData ? <CardActions data={cardData}/> : <CardActions.Skeleton/>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CardModal
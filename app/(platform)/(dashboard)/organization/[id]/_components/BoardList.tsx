import FormPopover from '@/components/form/FormPopover'
import Hint from '@/components/hint'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { HelpCircleIcon, User2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { MAX_FREE_BOARDS } from '@/constants/boards'
import { getAvailableCount } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'
type Props = {}

const BoardList = async(props: Props) => {

  const {orgId} = auth()

  if(!orgId){
   return redirect('/select-org')
  }

  const boards = await db.board.findMany({
    where:{
      orgId
    },
    orderBy:{
      createdAt: "asc"
    }
  })

  const availableCount = await getAvailableCount()

  const isPro = await checkSubscription()


  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-neutral-700 text-lg'>
        <User2Icon className={'h-6 w-6 mr-2'} />
        Your boards

      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          boards.map((board)=>(
            <Link key={board.id} href={`/board/${board.id}`} className='group relative bg-sky-700 bg-no-repeat aspect-video bg-center bg-cover rounded-sm h-full w-full p-2 overflow-hidden' style={{backgroundImage: `url(${board.imageThumbUrl})`}}>
              <div className='inset-0 bg-black/30 group-hover:bg-black/40 transition '/>
              <p className='relative font-semibold text-white '>{board.title}</p>
            </Link>
          ))
        }
        <FormPopover sideOffset={10} side='right'>
          <div role='button' className='aspect-video relative h-full w-full flex flex-col items-center justify-center bg-muted rounded-sm gap-y-1 hover:opacity-75 transition'>
            <p className='text-sm'>Create Your Board</p>
            <span className='text-xs'>{isPro ? "unlimited" : MAX_FREE_BOARDS - availableCount} remaining</span>
            <Hint sideOffset={40} desctiption={`Free Worksapces can have upto 5 open boards for unlimited boards upgrade this workspace.`}>
              <HelpCircleIcon className='abosulte bottom-2 right-2 h-[14px] w-[14px]' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}


BoardList.Skeleton = ()=>{
  console.log('ssskkkeeellltttooonnn');
  
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        <Skeleton className='aspect-video h-full w-full p-2'/>
        <Skeleton className='aspect-video h-full w-full p-2'/>
        <Skeleton className='aspect-video h-full w-full p-2'/>
        <Skeleton className='aspect-video h-full w-full p-2'/>
        <Skeleton className='aspect-video h-full w-full p-2'/>
        <Skeleton className='aspect-video h-full w-full p-2'/>
        <Skeleton className='aspect-video h-full w-full p-2'/>
        <Skeleton className='aspect-video h-full w-full p-2'/>
    </div>
  )
}


export default BoardList
BoardList.displayName = "BoardList"
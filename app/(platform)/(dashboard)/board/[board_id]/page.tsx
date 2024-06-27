import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import ListContainer from './_components/ListContainer'

type Props = {
  params: {
    board_id: string
  }
}

const BoardIdPage = async({ params }: Props) => {

  const {orgId} = auth()

  

  if(!orgId){
    redirect('/select-org')
  }

  const lists = await db.list.findMany({
    where:{
      boardId: params.board_id,
      board:{
        orgId
      }
    },
    include:{
      cards:{
        orderBy:{
          order: "asc"
        }
      }
    },
    orderBy:{
      order: "asc"
    }
  })

  

  return (
    <div className='p-4 h-full overflow-y-auto'>
      <ListContainer boardId={params.board_id} data={lists}/>
    </div>
  )
}

export default BoardIdPage
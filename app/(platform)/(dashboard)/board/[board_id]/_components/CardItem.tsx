"use client"
import { card } from '@prisma/client'
import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { useCardModal } from '@/hooks/use-card-modal'

type Props = {
  index: number,
  data: card
}

const CardItem = ({ index, data }: Props) => {

  const cardModal = useCardModal()

  return (
    <Draggable draggableId={data.id} index={index} >
      {
        (provided) => (
          <div onClick={()=>cardModal.onOpen(data.id)>console.log("card clicked")} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} role='button' className='truncate border-2 border-transparent hover:border-black transition duration-75 py-2 px-3 shadow-sm text-sm bg-white rounded-md'>
            {data.title}
          </div>
        )
      }
    </Draggable>

  )
}

export default CardItem
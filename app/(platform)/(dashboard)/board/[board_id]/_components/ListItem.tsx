"use client"
import { ListWithCards } from '@/types'
import React, { ElementRef, useRef, useState } from 'react'
import ListHeader from './ListHeader'
import CardForm from './CardForm'
import { cn } from '@/lib/utils'
import CardItem from './CardItem'
import { Droppable, Draggable } from "@hello-pangea/dnd"

type Props = {
  index: number,
  data: ListWithCards
}

const ListItem = ({ index, data }: Props) => {
  const textAreaRef = useRef<ElementRef<"textarea">>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const disableEditing = () => setIsEditing(false)
  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textAreaRef.current?.focus()
    })
  }


  return (
    <Draggable draggableId={data.id} index={index}>
      {
        (provided) => (
          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='shrink-0 h-full w-[272px] select-none'>
            <div {...provided.dragHandleProps} className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'>
              <ListHeader data={data} onAddCard={enableEditing} />
              <Droppable droppableId={data.id} type='card' >
                {
                  (provided) => (
                    <ol ref={provided.innerRef} {...provided.droppableProps} className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2", data.cards.length > 0 ? "mt-2 " : "mt-0 ")}>
                      {
                        data.cards.map((card, index) => (
                          <CardItem index={index} data={card} key={card.id} />
                        ))
                      }
                      {provided.placeholder}
                    </ol>
                  )
                }
              </Droppable>
              <CardForm ref={textAreaRef} isEditing={isEditing} listId={data.id} enableEditing={enableEditing} disableEditing={disableEditing} />
            </div>
          </li>
        )
      }
    </Draggable>
  )
}

export default ListItem
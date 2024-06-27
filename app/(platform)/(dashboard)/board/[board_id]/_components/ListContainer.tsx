"use client"
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { ListWithCards } from '@/types'
import ListForm from './ListForm'
import ListItem from './ListItem'
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { useAction } from '@/hooks/use-action'
import { updateListOrder } from '@/actions/update-list-order'
import { toast } from 'sonner'
import { updateCardOrder } from '@/actions/update-card-order'

type Props = {
  boardId: string,
  data: ListWithCards[]
}

const ListContainer = ({ data, boardId }: Props) => {
  const [orderedData, setOrderData] = useState(data)
  
  const { execute, error, data:listData, fieldErrors } = useAction(updateListOrder, {
    onSuccess: (data) => {
      toast.success("List reordered!")
    },
    onError: (error) => {
      console.log(error);

      toast.error(error)
    }
  })

  const {execute:executeCardOrder} = useAction(updateCardOrder, {
    onSuccess: (data)=>{
      toast.success("Card Reordered")
    },
    onError: (error)=>{
      toast.error(error)
    }
  })


  useEffect(() => {
    setOrderData(data)
  }, [data])




  function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)

    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result: any) => {

    
    const { destination, source, type } = result

    if (!destination) {
      return
    }
    //if dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    //user moves a list
    if (type === 'list') {
      const items = reOrder(orderedData, source.index, destination.index).map((item, index) => (
        {
          ...item,
          order: index
        }
      ))

      //TDOD : Trigger Server Action
      setOrderData(items)
      execute({ items, boardId })




    }
    //User moves a card

    if (type === "card") {
      const newOrderdData = [...orderedData]
      //source and destination list
      const sourceList = newOrderdData.find(list => list.id === source.droppableId)
      const desList = newOrderdData.find(list => list.id === destination.droppableId)

      if (!sourceList || !desList) {
        return;
      }

      //Check if cards exists in the source list
      if (!sourceList.cards) {
        sourceList.cards = []
      }
      //Check if cards exists in the destination list
      if (!desList.cards) {
        desList.cards = []
      }

      //Moving the card in same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reOrder(sourceList.cards, source.index, destination.index)
        reorderedCards.forEach((card, index) => {
          card.order = index
        })
        sourceList.cards = reorderedCards
        setOrderData(newOrderdData)
        //TODO : Trigger server action
        executeCardOrder({boardId, items:reorderedCards})

      } else {
        //user moves card to another list
        //remove card from the sourcelist
        const [movedCard] = sourceList.cards.splice(source.index, 1)
        //Assign the new list id to moved card
        movedCard.listId = destination.droppableId
        //Add card to the destination id
        desList.cards.splice(destination.index, 0, movedCard)

        sourceList.cards.forEach((card, index) => card.order = index)

        //Update the order for each card in the destList

        desList.cards.forEach((card, index) => card.order = index)

        setOrderData(newOrderdData)
        //TODO : Trigger server action
        executeCardOrder({boardId, items:desList.cards})
      }
    }

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal' >
        {
          (provided) => (
            <ol {...provided.droppableProps} ref={provided.innerRef} className='flex gap-x-3 h-4'>
              {
                orderedData.map((list, index) => (
                  <ListItem key={list.id} index={index} data={list} />
                ))
              }
              {provided.placeholder}
              <ListForm />
              <div className='flex-shrink-0 w-1' />
            </ol>
          )
        }
      </Droppable>
    </DragDropContext>
  )
}

export default ListContainer
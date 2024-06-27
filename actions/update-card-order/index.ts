"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { UpdateCardOrder } from "./schema"

const handler = async (data:InputType):Promise<ReturnType>=>{
    console.log('----------------Inside update handler--------------------------');
    
    const {userId, orgId} = auth()
    if(!userId || !orgId){
        return {
            error: "Unautorized"
        }
    }

    const {items, boardId} = data

    console.log(items, "create list");
    

    let cards

    try {
      const transaction = items.map((card)=>db.card.update({
        where:{
            id: card.id,
            list: {
                board:{
                    orgId
                }
            }
        },
        data:{
            order: card.order,
            listId: card.listId
        }
      }))

      cards = await db.$transaction(transaction)
      
    } catch (error) {
        console.log(error);
        
        return {
            error :"Failed to reorder"
        }
    }
    revalidatePath(`/board/${boardId}`)
    return {data:cards}
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
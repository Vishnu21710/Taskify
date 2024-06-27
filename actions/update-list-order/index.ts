"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { UpdateListOrder } from "./schema"

const handler = async (data:InputType):Promise<ReturnType>=>{
    console.log('----------------Inside update handler--------------------------');
    
    const {userId, orgId} = auth()
    if(!userId || !orgId){
        return {
            error: "Unautorized"
        }
    }

    const {boardId, items} = data

    console.log(items, "create list");
    

    let lists

    try {
      const transaction = items.map((list)=>{
        return db.list.update({
            where:{
                id: list.id,
                board: {
                    orgId
                }
            },
            data:{
                order: list.order
            }
        })
      })
      console.log(transaction, 'Transactionsssss');
      

      lists = await db.$transaction(transaction)
      console.log(lists, 'list serveer');
      
    } catch (error) {
        console.log(error);
        
        return {
            error :"Failed to reorder"
        }
    }
    revalidatePath(`/board/${boardId}`)
    return {data:lists}
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)
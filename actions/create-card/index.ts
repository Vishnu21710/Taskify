"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateCard } from "./schema"
import { ACTIONS, ENTITY_TYPE } from "@prisma/client"
import { createAuditLog } from "@/lib/create-auditlog"

const handler = async (data:InputType):Promise<ReturnType>=>{
    const {userId, orgId} = auth()
    if(!userId || !orgId){
        return {
            error: "Unautorized"
        }
    }

    const {boardId, title, listId} = data

    console.log(boardId, "create list");
    

    let card

    try {
        //first checking for board if board belongs to a org id  then proceed if not then return error Board not found
       const list = await db.list.findUnique({
        where:{
            id: listId,
            boardId,
            board:{
                orgId
            }
        }
       })

       if(!list){
        return {
            error: "List not found"
        }
       }

       const lastCard = await db.card.findFirst({
        where:{
            listId
        },
        orderBy:{order: "desc"},
        select: {order: true}
       })

       const newOrder = lastCard ? lastCard.order + 1 : 1

       card = await db.card.create({
        data:{
            order: newOrder,
            title,
            listId,
        }
       })

       if(card){
        const createCardAuditlog = await createAuditLog({
            action: ACTIONS.CREATE,
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD
        })
       }
    } catch (error) {
        return {
            error :"Failed to create"
        }
    }
    revalidatePath(`/board/${boardId}`)
    return {data:card}
}

export const createCard = createSafeAction(CreateCard, handler)
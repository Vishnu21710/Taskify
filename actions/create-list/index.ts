"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateList } from "./schema"
import { createAuditLog } from "@/lib/create-auditlog"
import { ACTIONS, ENTITY_TYPE } from "@prisma/client"

const handler = async (data:InputType):Promise<ReturnType>=>{
    const {userId, orgId} = auth()
    if(!userId || !orgId){
        return {
            error: "Unautorized"
        }
    }

    const {boardId, title} = data

    console.log(boardId, "create list");
    

    let list

    try {
        //first checking for board if board belongs to a org id  then proceed if not then return error Board not found
        const board = await db.board.findUnique({
            where:{
                id: boardId,
                orgId
            }
        })

        if(!board){
            return {
                error: "Board Not Found"
            }
        }

        // Get the last list item 
        const lastList = await db.list.findFirst({
            where:{ boardId},
            orderBy:{ order: 'desc'},
            select: {order: true}
        })

        // if we have a last list item then increase the order so that our newly created list gets appended to the end of it ...if no lst list item then its the first item so make the newOrder = 1
        const newOrder = lastList ? lastList.order + 1 : 1

        list = await db.list.create({
            data:{
                title,
                boardId,
                order: newOrder
            },
            include:{
                cards: true
            }
        })

        if(list){
            await createAuditLog({
                action: ACTIONS.CREATE,
                entityId: list.id,
                entityTitle: list.title,
                entityType: ENTITY_TYPE.LIST
            })
        }
    } catch (error) {
        return {
            error :"Failed to create"
        }
    }
    revalidatePath(`/board/${boardId}`)
    return {data:list}
}

export const createList = createSafeAction(CreateList, handler)
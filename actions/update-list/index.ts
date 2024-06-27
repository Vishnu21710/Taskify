"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { UpdateList } from "./schema"
import { createAuditLog } from "@/lib/create-auditlog"
import { ACTIONS, ENTITY_TYPE } from "@prisma/client"

const handler = async (data:InputType):Promise<ReturnType>=>{
    const {userId, orgId} = auth()
    if(!userId || !orgId){
        return {
            error: "Unautorized"
        }
    }

    const {id, title, boardId} = data

    let list

    try {
        list = await db.list.update({
            where:{
                id,
                boardId,
                board:{
                    orgId
                }
            },
            data:{
                title
            }
        })
        if(list){
            await createAuditLog({
                action: ACTIONS.UPDATE,
                entityType: ENTITY_TYPE.LIST,
                entityId: list.id,
                entityTitle: list.title
            })
        }
    } catch (error) {
        return {
            error :"Failed to update"
        }
    }
    revalidatePath(`/board/${boardId}`)
    return {data:list}
}

export const updateList = createSafeAction(UpdateList, handler)
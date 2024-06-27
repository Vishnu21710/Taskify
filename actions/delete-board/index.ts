"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { DeleteBoard } from "./schema"
import { redirect } from "next/navigation"
import { createAuditLog } from "@/lib/create-auditlog"
import { ACTIONS, ENTITY_TYPE } from "@prisma/client"
import { decrementAvalableCount } from "@/lib/org-limit"
import { checkSubscription } from "@/lib/subscription"

const handler = async (data:InputType):Promise<ReturnType>=>{
    const {userId, orgId} = auth()
    const isPro = await checkSubscription()
    if(!userId || !orgId){
        return {
            error: "Unautorized"
        }
    }

    const {id} = data

    let board

    try {
        board = await db.board.delete({
            where:{
                id,
                orgId
            },
            
        })
        if(board){
            if(!isPro){
                await decrementAvalableCount()
            }

            await createAuditLog({
                action: ACTIONS.DELETE,
                entityType: ENTITY_TYPE.BOARD,
                entityId: board.id,
                entityTitle: board.title
            })
        }
    } catch (error) {
        return {
            error :"Failed to delete"
        }
    }
    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
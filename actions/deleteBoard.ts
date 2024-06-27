"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteBoard = async(id: string, organizationId:string):Promise<void | unknown>=>{

    

    try {
        await db.board.delete({
            where: {
                id
            }
        })
    } catch (error) {
        console.log(error);
        return error 
    }

    revalidatePath(`/organization/${organizationId}`)
}
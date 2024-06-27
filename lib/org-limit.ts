import { auth } from "@clerk/nextjs/server";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { db } from "./db";

export const incrementAvalableCount = async()=>{
    const  {orgId} = auth()

    if(!orgId){
        throw new Error("Unauthorized")
    }

    const orgLimit = await db.orglimit.findUnique({
        where:{
            orgId
        }
    })

    if(orgLimit){
        await db.orglimit.update({
            where:{
                orgId
            },
            data:{
                count: orgLimit.count + 1
            }
        })
    }else{
        await db.orglimit.create({
            data:{
                count: 1,
                orgId
            }
        })
    }
}


export const decrementAvalableCount = async()=>{
    const  {orgId} = auth()

    if(!orgId){
        throw new Error("Unauthorized")
    }

    const orgLimit = await db.orglimit.findUnique({
        where:{
            orgId
        }
    })

    if(orgLimit){
        await db.orglimit.update({
            where:{
                orgId
            },
            data:{
                count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 //refer paytm project to handle negative values
            }
        })
    }else{
        await db.orglimit.create({
            data:{
                count: 1,
                orgId
            }
        })
    }
}

export const hasAvailableCount = async()=>{
    const {orgId} = auth()
    if(!orgId){
        throw new Error("Unauthorized")
    }

    const orgLimit = await db.orglimit.findUnique({
        where:{
            orgId
        }
    })

    if(!orgLimit || orgLimit.count < MAX_FREE_BOARDS){
        return true
    }else{
        return false
    }
}

export const getAvailableCount = async()=>{
    const {orgId} = auth()
    
    if(!orgId){
        return 0
    }

    const orgLimit = await db.orglimit.findUnique({
        where:{
            orgId
        }
    })

    if(!orgLimit){
        return 0
    }else{
        return orgLimit.count
    }
}
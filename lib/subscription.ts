import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const DAY_IN_MS = 86_400_400

export const checkSubscription = async()=>{
    const {orgId} = auth()

    if(!orgId){
        return false
    }

    const orgSubscription = await db.orgsubs.findUnique({
        where:{
            orgId
        },
        select:{
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscriptionId: true
        }
    })

    if(!orgSubscription){
        return false
    }

    const isValid = orgSubscription.stripePriceId && orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

    return !!isValid
}
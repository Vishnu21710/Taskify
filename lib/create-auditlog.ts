import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTIONS, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";

interface Props {
  entityId: string;
  entityTitle: string;
  entityType: ENTITY_TYPE;
  action: ACTIONS;
}

export const createAuditLog = async({action, entityId, entityTitle, entityType}:Props)=>{
    try {
        const {orgId} = auth()
        const user = await currentUser()

        if(!orgId || !user){
            throw new Error("User Not Found! ")
        }

        const auditLog = await db.auditlog.create({
            data:{
                entityId,
                action,
                entityTitle,
                entityType,
                orgId,
                userId: user.id,
                userImage: user?.imageUrl,
                userName: `${user.firstName} ${user.lastName}`
            }
        })
    } catch (error) {
        console.log('Audit log error:'+ " "+ error);
    }
}

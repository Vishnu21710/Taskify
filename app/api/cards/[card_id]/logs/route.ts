import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { card_id: string } }
) {
  try {
    const { orgId, userId } = auth();

    if (!orgId || !userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLogs = await db.auditlog.findMany({
        where:{
            orgId, 
            entityType:ENTITY_TYPE.CARD,
            entityId: params.card_id
        },
        orderBy:{
            createdAt: "desc"
        },
        take: 3
    })

    return NextResponse.json({
        auditLogs
    })

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

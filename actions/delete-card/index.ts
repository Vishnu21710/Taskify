"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";
import { createAuditLog } from "@/lib/create-auditlog";
import { ACTIONS, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unautorized",
    };
  }

  const { id, boardId } = data;

  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list:{
          board:{
            orgId
          }
        }
      }
    })
    if(card){
      await createAuditLog({
        action: ACTIONS.DELETE,
        entityType: ENTITY_TYPE.CARD,
        entityId: card.id,
        entityTitle: card.title
      })
    }
  } catch (error) {
    return {
      error: "Failed to delete",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);

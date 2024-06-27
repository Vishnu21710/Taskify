"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-auditlog";
import { ACTIONS, ENTITY_TYPE } from "@prisma/client";
import { incrementAvalableCount, hasAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const canCreate = await hasAvailableCount();
  const isPro = await checkSubscription();
  if (!canCreate && !isPro) {
    return {
      error:
        "Max limit exceeded, Please upgrade your organization to add more boards.",
    };
  }

  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUsername] =
    image.split("|");

  console.log({
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUsername,
  });

  if (
    !imageId ||
    !imageFullUrl ||
    !imageUsername ||
    !imageLinkHTML ||
    !imageThumbUrl
  ) {
    return {
      error: "Missing fields, Failed to create board",
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        imageFullUrl,
        imageId,
        imageLinkHTML,
        imageThumbUrl,
        imageUsername,
        orgId,
      },
    });
    if (!isPro) {
      await incrementAvalableCount();
    }

    if (board) {
      await createAuditLog({
        entityId: board.id,
        entityTitle: board.title,
        action: ACTIONS.CREATE,
        entityType: ENTITY_TYPE.BOARD,
      });
    }
  } catch (error) {
    console.log(error, "create board error");

    return {
      error: "Failed to create",
    };
  }

  revalidatePath(`/board/${board.id}`);

  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);

// "use server";
// import z from "zod";
// import { db } from "@/lib/db";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// export type State = {
//   errors?: {
//     title?: string[];
//   };
//   message?: string | null ;
// };

// const CreateBoard = z.object({
//   title: z.string().min(3, {
//     message: "Title should me more than 3 characters.",
//   }),
// });

// export const createBoard = async (prevState: State, formData: FormData) => {
//   // const id = formData.get("org_id") as string

//   const { success, data, error } = CreateBoard.safeParse({
//     title: formData.get("title") as string,
//   });

//   if (!success || error) {
//     return {
//       errors: error.flatten().fieldErrors,
//       message: "missing field",
//     };
//   }

//   const { title } = data;

//   try {
//     const newBoard = await db.board.create({
//       data: {
//         title,
//       },
//     });
//   } catch (error) {
//     return {
//       message: "Databse Error",
//     };
//   }

//   revalidatePath(`/organization/org_2iC3wSPRKrcwYD3rUHjgMOjPzet`);

//   redirect(`/organization/org_2iC3wSPRKrcwYD3rUHjgMOjPzet`);
// };

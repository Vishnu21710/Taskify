import {z} from "zod"
import { board, card, list } from "@prisma/client"
import { ActionState } from "@/lib/create-safe-action"
import { CopyCard } from "./schema"

export type InputType = z.infer<typeof CopyCard>
export type ReturnType = ActionState<InputType, card>
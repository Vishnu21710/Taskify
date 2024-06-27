import {z} from "zod"
import { board, card, list } from "@prisma/client"
import { ActionState } from "@/lib/create-safe-action"
import { DeleteCard } from "./schema"

export type InputType = z.infer<typeof DeleteCard>
export type ReturnType = ActionState<InputType, card>
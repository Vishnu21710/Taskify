import {z} from "zod"
import { board } from "@prisma/client"
import { ActionState } from "@/lib/create-safe-action"
import { UpdateBoard } from "./schema"

export type InputType = z.infer<typeof UpdateBoard>
export type ReturnType = ActionState<InputType, board>
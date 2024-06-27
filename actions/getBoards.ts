import { db } from "@/lib/db"

export const getBoards = async()=>{
    const boards = await db.board.findMany()
    return boards
}
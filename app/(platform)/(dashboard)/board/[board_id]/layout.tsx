import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import { title } from 'process'
import React, { ReactNode } from 'react'
import BoardNavbar from './_components/BoardNavbar'

export const generateMetadata = async ({ params }: { params: { board_id: string } }) => {
    const { orgId } = auth()

    if (!orgId) {
        return {
            title: "Board"
        }
    }

    const board = await db.board.findUnique({
        where: {
            id: params.board_id,
            orgId
        }
    })



    return {
        title: board?.title || "Board"
    }


}

type Props = {
    children: ReactNode,
    params: {
        board_id: string
    }
}

const BoardIdLayout = async ({ children, params }: Props) => {

    const { orgId } = auth()

    if (!orgId) {
        redirect('/select-org')
    }

    const board = await db.board.findUnique({
        where: {
            id: params.board_id,
            orgId
        }
    })

    if (!board) {
        notFound()
    }

    return (
        <div className=' h-full bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${board.imageFullUrl})` }}>
            <BoardNavbar data={board}/>
            <div className='absolute inset-0 bg-black/10'/>
            <main className='relative pt-28 h-full'>
                {children}
            </main>
        </div>
    )
}

export default BoardIdLayout
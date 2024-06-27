import { board } from '@prisma/client'
import React from 'react'
import BoardTitleForm from './BoardTitleForm'
import BoardOptions from './BoardOptions'

type Props = {
    data: board
}

const BoardNavbar = async ({ data }: Props) => {

    return (
        <div className='w-full h-14 fixed top-14 z-[40] bg-black/50 flex items-center px-6 gap-x-4 text-white'>
            <BoardTitleForm data={data}/>
            <div className='ml-auto'>
                    <BoardOptions id={data.id}/>
            </div>
        </div>
    )
}

export default BoardNavbar
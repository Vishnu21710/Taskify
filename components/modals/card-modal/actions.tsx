import { copyCard } from '@/actions/copy-card'
import { deleteCard } from '@/actions/delete-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { useCardModal } from '@/hooks/use-card-modal'
import { CardWithList } from '@/types'
import { Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    data: CardWithList
}

const CardActions = ({ data }: Props) => {

    const {onClose} = useCardModal()

    const {execute:executeCopyCard, isLoading:isLoadingCopy} = useAction(copyCard, {
        onSuccess:(data)=>{
            onClose()
            toast.success(`Card ${(data.title).split('-')[0]} copied to list.`)
        },
        onError:(error)=>toast.error(error)
    })

    const {execute:executeDeleteCard, isLoading:isLoadingDelete} = useAction(deleteCard, {
        onSuccess:(data)=>{
            onClose()
            toast.success(`Card ${(data.title)} deleted.`)
        },
        onError:(error)=>toast.error(error)
    })

    const params = useParams()

    const onCopy = ()=>{
        const boardId = params.board_id as string

        executeCopyCard({boardId, id:data.id})
    }

    const onDelete = ()=>{
        const boardId = params.board_id as string
        executeDeleteCard({boardId, id: data.id})

    }

    return (
        <div className='space-y-2 mt-2'>
            <p className='text-sm font-semibold'>Actions</p>
            <Button disabled={isLoadingCopy} onClick={()=>onCopy()}  size={"inline"} className='w-full hover:bg-blue-500 justify-start bg-blue-400 text-white'><Copy className='h-4 w-4 mr-2' /> Copy</Button>
            <Button disabled={isLoadingDelete} onClick={onDelete}  size={"inline"} className='w-full hover:bg-rose-600 justify-start bg-rose-500 text-white'><Trash className='h-4 w-4 mr-2' /> Delete</Button>

        </div>
    )
}

CardActions.Skeleton = () => (
    <div className='space-y-2 mt-2'>
        <Skeleton className='w-20 h-4 bg-neutral-200' />
        <Skeleton className='w-full h-8 bg-neutral-200' />
        <Skeleton className='w-full h-8 bg-neutral-200' />
    </div>
)

export default CardActions
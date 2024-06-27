// import { getBoards } from "@/actions/getBoards"
// import { Button } from "@/components/ui/button"
// import Board from "./_components/board"
// import Form from "./_components/form"
import { Separator } from "@/components/ui/separator";
import Info from "./_components/Info";
import BoardList from "./_components/BoardList";
import { Suspense } from "react";
import { checkSubscription } from "@/lib/subscription";

type Props = {
    params: {
        id: string
    },
    searchParams: any
}

const OrganizationPage = async ({ params, searchParams }: Props) => {
    console.log(params, 'params');
    console.log(searchParams, 'search');

    const { id } = params

    const isPro = await checkSubscription()

    return (
        <div className="w-full mb-20">

            <Info isPro={isPro}/>
            <Separator className="my-4" />
            <div className="px-2 md:px-4">
                <Suspense fallback={<BoardList.Skeleton/>}>
                    <BoardList />
                </Suspense>
            </div>
        </div>
    )
}

export default OrganizationPage
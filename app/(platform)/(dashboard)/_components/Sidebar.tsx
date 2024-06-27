"use client"
import Link from "next/link"
import { PlusCircleIcon } from "lucide-react"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { useLocalStorage } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { Accordion } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import NavItem, { Org } from "./NavItem"

type Props = {
    storageKey?: string
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: Props) => {

    // {localstorage_key: {org_id : boolean}}
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})

    console.log(expanded, 'expanded');

    //active org
    const { organization: activeOrg, isLoaded: isLoadedOrg } = useOrganization()

    //membership lists
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    })

    //returns the ids of organization
    const defaultAccordianValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
        if (expanded[key]) {
            acc.push(key)
        }

        return acc
    }, [])



    const onExpand = (id: string) => {
        setExpanded(curr => ({
            ...curr,
            [id]: !expanded[id]
        }))
    }

    if (!isLoadedOrgList || !isLoadedOrg || userMemberships.isLoading) {
        return (
            <>
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-10 w-[50%]"/>
                    <Skeleton className="h-10 w-10"/>
                </div>
                <div className="space-y-3">
                    <NavItem.Skeleton/>
                    <NavItem.Skeleton/>
                    <NavItem.Skeleton/>
                </div>
            </>
        )
    }



    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="">
                    Workspaces
                </span>
                <Button asChild type="button" size={"icon"} variant={"ghost"} className="ml-auto">
                    <Link href={'/select-org'}><PlusCircleIcon className="h-4 w-4 " /></Link>
                </Button>
            </div>
            <Accordion defaultValue={defaultAccordianValue} type="multiple">
                {
                    userMemberships.data.map(({ organization }) => {
                        return (
                            <NavItem
                                key={organization.id}
                                isActive={activeOrg?.id === organization.id}
                                isExpanded={expanded[organization.id]}
                                onExpand={onExpand}
                                organization={organization as Org}
                            />
                        )
                    })
                }
            </Accordion>
        </>
    )
}

export default Sidebar
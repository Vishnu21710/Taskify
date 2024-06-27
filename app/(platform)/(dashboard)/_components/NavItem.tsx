import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export type Org = {
  id: string,
  imageUrl: string
  slug: string
  name: string
}

type Props = {
  isActive: boolean,
  onExpand: (id: string) => void,
  isExpanded: boolean
  organization: Org
}



const NavItem = ({ isActive, isExpanded, onExpand, organization }: Props) => {

  const router = useRouter()
  const pathname = usePathname()

  console.log(pathname, 'path');
  


  const routes: { label: string, icon: ReactNode, href: string }[] = [
    {
      label: "Boards",
      icon: <Layout className='h-4 2-4 mr-2' />,
      href: `/organization/${organization.id}`
    },
    {
      label: "Activity",
      icon: <Activity className='h-4 2-4 mr-2' />,
      href: `/organization/${organization.id}/activity`
    },
    {
      label: "Settings",
      icon: <Settings className='h-4 2-4 mr-2' />,
      href: `/organization/${organization.id}/settings`
    },
    {
      label: "Billing",
      icon: <CreditCard className='h-4 2-4 mr-2' />,
      href: `/organization/${organization.id}/billing`
    },
  ]

  const onClick = (href: string) => {
    router.push(href)
  }

  const isPathActive = (href: string)=>{
    if(href === `/organization/${organization.id}`){
      return href === pathname
    }
    const regex = new RegExp(`^${href}(/.*)?$`)
    return regex.test(pathname)
  }

  return (
    <AccordionItem value={organization.id} className='border-none'>
      <AccordionTrigger onClick={() => onExpand(organization.id)} className={cn('flex items-center gap-x-2 p-1.5 text-neutral-700 roudned-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline', isActive && isExpanded && 'bg-sky-700/10 text-sky-700')}>
        <div className='flex items-center gap-x-2'>
          <div className='w-7 h-7 relative'>
            <Image
              fill
              src={organization.imageUrl}
              alt='organization image'
              className='rounded-sm object-cover'
            />
          </div>
          <span className='font-medium text-sm'>
            {organization.name}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-1 text-neutral-700'>
        {
          routes.map(r =>
          (
            <Button variant={"ghost"} className={cn('w-full font-normal justify-start pl-10 mb-1', isPathActive(r.href) && 'bg-sky-700/10 text-sky-700')} size={"sm"} onClick={() => onClick(r.href)} key={r.href}>
              {r.icon}
              {r.label}
            </Button>
          )
          )
        }

      </AccordionContent>
    </AccordionItem>
  )
}

NavItem.Skeleton = ()=>{
  return (
    <div className='flex items-center gap-x-2'>
        <div className='w-10 h-10 relative shrink-0'> 
          <Skeleton className='h-full w-full absolute'/>
        </div>
          <Skeleton className='h-10 w-full'/>
    </div>
  )
}

export default NavItem
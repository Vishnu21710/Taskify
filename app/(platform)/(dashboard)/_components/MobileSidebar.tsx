"use client"
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSidebar } from '@/hooks/user-mobile-sidebar'
import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

type Props = {}

const MobileSidebar = (props: Props) => {
  const [mounted, setIsMounted] = useState<boolean>(false)
  const {isOpen, onClose, onOpen} = useMobileSidebar(state=>state)
  const pathname = usePathname()

  useEffect(()=>{
    setIsMounted(true)
  }, [])

  useEffect(()=>{
      onClose()
  }, [pathname, onClose])

  if(!mounted){
    return null
  }

  return (
    <div>
      <Button className='block md:hidden mr-3' size={"sm"} variant={"ghost"}  onClick={onOpen}><MenuIcon className='h-4 w-4'/></Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className='p-2 pt-10'>
          <Sidebar storageKey='t-sidebar-mobile-state'/>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileSidebar
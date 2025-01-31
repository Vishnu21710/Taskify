import { Plus, PlusCircle } from 'lucide-react'
import React from 'react'

import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import FormPopover from '@/components/form/FormPopover'
type Props = {}

const DashboardNavbar = (props: Props) => {
    return (
        <nav className='fixed z-50 top-0 h-14 px-4 w-full border-b shadow-sm bg-white flex items-center'>
            {/* Mobile Sidebar */}
            <MobileSidebar />
            <div className='flex items-center gap-x-4'>
                <div className='md:flex hidden'>
                    <Logo />
                </div>
                <FormPopover align='start' side='bottom' sideOffset={18}>
                    <Button variant={'primary'} size={'sm'} className='rounded-sm hidden md:block py-1.5 px-2 h-auto'> Create </Button>
                </FormPopover>
                <FormPopover align='start' side='bottom' sideOffset={18}>
                    <Button variant={'primary'} className='rounded-sm block md:hidden'><PlusCircle className='h-4 w-4' /></Button>
                </FormPopover>
            </div>
            <div className='ml-auto flex items-center gap-x-2'>
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl={"/organization/:id"}
                    afterSelectOrganizationUrl={"/organization/:id"}
                    afterLeaveOrganizationUrl={"/select-org"}
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }
                        }
                    }}
                />
                <UserButton afterSignOutUrl='/' appearance={{
                    elements: {
                        avatarBox: {
                            height: 30,
                            width: 30
                        }
                    }
                }} />
            </div>
        </nav>
    )
}

export default DashboardNavbar
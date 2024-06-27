import ModalProvider from '@/components/providers/modal-provider'
import { ClerkProvider } from '@clerk/nextjs'
import React, { ReactNode } from 'react'
import { Toaster } from "sonner"
import QueryProvider from '@/components/providers/query-provider'

type Props = {
  children: ReactNode
}

const PlatformLayout = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster position='top-right' richColors />
        <ModalProvider />
        <div>
          {children}
        </div>
      </QueryProvider>
    </ClerkProvider>
  )
}

export default PlatformLayout
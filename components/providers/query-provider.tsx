"use client"
import React, { ReactNode, useState } from 'react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

type Props = {
    children: ReactNode
}

const QueryProvider = ({children}: Props) => {
    const [queryClient] = useState(()=>new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryProvider
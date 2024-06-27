import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const ListWrapper = ({children}: Props) => {
  return (
    <li className='h-full w-[272px] shrink-0 select-none'>
        {children}
    </li>
  )
}

export default ListWrapper
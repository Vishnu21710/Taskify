import { startCase } from 'lodash'
import React, { ReactNode } from 'react'
import OrgControl from './_components/OrgControl'
import { auth } from '@clerk/nextjs/server'


export async function generateMetadata() {
    const {orgSlug} = auth()

    return {
        title: startCase(orgSlug || "Organization")
    }
}
type Props = {
    children: ReactNode
}

const OraganizationIDLayout = ({ children }: Props) => {
    return (
        <>
            <OrgControl />
            {children}
        </>
    )
}

export default OraganizationIDLayout
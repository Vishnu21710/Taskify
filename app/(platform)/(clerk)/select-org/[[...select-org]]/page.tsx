
import { OrganizationList } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const CreateOrg = (props: Props) => {
  return (
    <div>
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl={'/organization/:id'}
            afterCreateOrganizationUrl={'/organization/:id'}
        />
    </div>
  )
}

export default CreateOrg
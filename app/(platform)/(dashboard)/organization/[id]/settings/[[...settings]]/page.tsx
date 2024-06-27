import React from 'react'
import { OrganizationProfile } from '@clerk/nextjs'

type Props = {}

const OrganizationSettings = (props: Props) => {
  return (
    <div className='w-full'>
        <OrganizationProfile
            appearance={{
                elements:{
                    rootBox:{
                        boxShadow: "none",
                        width: "100%",
                    },
                    cardBox:{
                        boxShadow: "none",
                        width: "100%",
                        border: "1px solid #e5e5e5"
                    }
                    

                }
            }}
        />
    </div>
  )
}

export default OrganizationSettings
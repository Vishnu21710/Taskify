"use client"
import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'
import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import React, { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { Skeleton } from '../ui/skeleton'
import Link from 'next/link'
import FormErrors from './FormErrors'
import { default_image } from '@/constants/images'

type Props = {
    id: string,
    errors?: Record<string, string[] | undefined>
}

const FormPicker = ({ id, errors }: Props, ImageSkeleton?: any) => {

    const { pending } = useFormStatus()

    const [images, setImages] = useState<Record<string, any>[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedImageid, setSelectedImageId] = useState(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                throw new Error("Test")
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 9
                })

                console.log(result);
                

                if (result && result.response) {
                    const newImages = result.response as Record<string, any>[]
                    setImages(newImages)
                } else {
                    console.log("Error : Failed to retrieve images from unsplash");

                }
            } catch (error) {
                console.log(error);
                setImages(default_image)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchImages()
    }, [])

    if (isLoading) {
        return (
            // <div className='flex justify-center'>
            //     <Loader2 className='h-6 w-6 text-sky-700 animate-spin'/>
            // </div>
            <FormPicker.ImageSkelton />
        )
    }

    return (
        <div className='relative'>
            <div className='grid grid-cols-3 gap-2 mb-2'>
                {
                    images.map((image) => (
                        <div onClick={() => {
                            if (pending) return
                            setSelectedImageId(image.id)
                        }} key={image.id} className={cn('cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted', pending && "opacity-50 hover:opacity-50 cursor-auto")}>
                            <input value={`${image.id} | ${image.urls.thumb} | ${image.urls.full} | ${image.links.html} | ${image.user.name}`} type="radio" id={id} name={id} className="hidden" checked={selectedImageid === image.id} disabled={pending}/>
                            <Image fill src={image.urls.thumb} alt='unsplash image' className='object-cover rounded-sm' />
                            {
                                selectedImageid === image.id && (
                                    <div className='absolute inset-y-0 h-full w-full ba-black/30 flex items-center justify-center'>
                                            <Check className='h-4 w-4 text-white'/>
                                    </div>
                                )
                            }
                            <Link target='_blank' href={image.links.html} className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'>
                                {image.user.name}
                            </Link>
                        </div>
                    ))
                }
            </div>
            <FormErrors id='image' errors={errors}/>
        </div>
    )
}


FormPicker.ImageSkelton = () => {
    return (
        <div className='grid grid-cols-3 gap-2 mb-2'>
            {
                Array.from(Array(9)).map((s,index) => (
                    <Skeleton key={index} className=' relative aspect-video group hover:opacity-75 transition bg-muted' />
                ))
            }
        </div>
    )
} 

export default FormPicker



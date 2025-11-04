'use client'

import { HomePostType } from "@/utils/supabase/queries"
import Link from "next/link"
import Image from "next/image"

const HomePosts = ({posts}: {posts: HomePostType}) => {
    return(
        <section className="w-[1200px] m-auto">
            <h1 className="p-10 text-3xl font-bold text-center">Latest Posts</h1>
            <div className="grid grid-cols-4 gap-3">
                {posts && posts.map(({id, slug, title, price, image, created_at}) => {
                    const date = new Date(created_at)
                    const createdDay = date.getDate()
                    const createdMonth = date.toLocaleString('default', { month: 'long' });
                    const createdYear = date.getFullYear()

                    return( 
                        <Link href={`/${slug}`} key={id} className="w-full flex flex-col bg-white rounded">
                            {image?.length 
                                ? <Image src={image[0]} alt={title} width={800} height={800} className="w-full h-40 object-cover rounded"/>
                                : <p className="w-full h-40 flex justify-center items-center text-[#6f6f6f] bg-gray-200 rounded">No Images</p>
                            }
                            <div className="p-4 flex flex-col flex-1 justify-between">
                                <p className="text-sm">{title}</p>
                                <p className="mt-2 font-bold">{price} $</p>
                                <p className="mt-2 text-xs text-[#6f6f6f]">Published {createdMonth} {createdDay}, {createdYear}</p>
                            </div>
                        </Link> 
                    )
                })}
            </div>
        </section>
    )
}

export default HomePosts
'use client'

import { HomePostType } from "@/utils/supabase/queries"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Pagination from "@/components/Home/Pagination"


const HomePosts = ({posts}: {posts: HomePostType}) => {
    const POSTS_PER_PAGE = 12

    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

    return(
        <section id="home-posts" className="w-[1200px] m-auto scroll-mt-20 max-[1250px]:w-full max-[1250px]:px-4">
            <h1 className="p-10 text-2xl font-extrabold text-center text-[#393939]">Latest Posts</h1>
            <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-sm:grid-cols-2">
                {currentPosts.length > 0 && currentPosts.map(({id, slug, title, price, image, created_at}) => {
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
                                <p className="text-sm break-words">{title}</p>
                                <p className="mt-2 font-bold">{price} $</p>
                                <p className="mt-2 text-xs text-[#6f6f6f]">Published {createdMonth} {createdDay}, {createdYear}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {posts.length === 0 && <p className="text-center text-[#6f6f6f] capitalize">No posts found in this category</p>}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </section>
    )
}

export default HomePosts
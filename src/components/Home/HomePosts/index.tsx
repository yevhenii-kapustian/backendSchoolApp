'use client'

import { HomePostType } from "@/utils/supabase/queries"
import Link from "next/link"

const HomePosts = ({posts}: {posts: HomePostType}) => {
    return(
        <div className="flex flex-col gap-5">
            {posts && posts.map(({id, slug, title, users}) => 
                <Link href={`/${slug}`} key={id} className="p-4 block border rounded">
                    <p>{title}</p>
                    <p className="text-end">by {users.username}</p>
                </Link> 
            )}
        </div>
    )
}

export default HomePosts
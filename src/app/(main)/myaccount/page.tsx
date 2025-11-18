import Link from "next/link"
import { createClient } from "@/utils/supabase/server-client"
import { getPostsByUser } from "@/utils/supabase/queries"
import MyPostsItem from "./MyPostsItem"
import NoPostMessage from "./NoPostsMessage"

const MyAccountPage = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return <div className="py-10 text-center capitalize">Please <Link className="font-semibold underline" href="/auth/login">log in</Link></div>
    }

    const { data: authorPosts } = await getPostsByUser(supabase, user.id)
    
    return(
        <>
            {authorPosts?.length 
                ? (
                    <section className="w-250 mt-5 m-auto grid grid-cols-4 gap-5 max-lg:w-full max-lg:px-5 max-lg:grid-cols-3 max-sm:grid-cols-2">
                     <MyPostsItem post={authorPosts}/> 
                    </section>
                ) : ( 
                    <div className="w-250 m-auto mt-5 py-10 px-5 flex flex-col items-center text-center text-[#393939] gap-2 max-lg:w-full">
                        <NoPostMessage/>
                    </div> 
                )
            }
        </>
    )
}

export default MyAccountPage
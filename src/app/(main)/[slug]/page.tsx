import { getSinglePost } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import Image from "next/image"
import EditButton from "./EditButton"

const SinglePost = async ({params}: {params:{slug: string}}) => {
    const {slug} = await params
    const {data, error} = await getSinglePost(slug)

    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()
    const isAuthor = user?.id === data?.user_id ? true : false

    return(
        <div>
            {data && 
            <>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.categories?.name}</p>
                    <p>{data.content}</p>
                    <p>{data.price}</p>
                    {data.image && <Image src={data.image!} alt={data.title} width={1000} height={1000} priority style={{width: "700px", height: "auto"}}/>}
                </div> 
                {isAuthor && (
                    <div>
                        <DeleteButton postId={data.id}/>
                        <EditButton slug={slug}/>
                    </div>
                )}
            </>
            }
        </div>
    )
}

export default SinglePost
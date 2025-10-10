import { getSinglePost } from "@/utils/supabase/queries"
import EditForm from "./EditForm"

const EditPage = async ({params}: {params:{slug: string}}) => {
    const {slug} = await params
    const {data, error} = await getSinglePost(slug)

    return(
        <div>
            {data && 
               <EditForm postId={data.id} initialValues={{title: data.title, content: data.content, image: data.image}} />
            }
        </div>
    )
}

export default EditPage
import { getSinglePost } from "@/utils/supabase/queries"
import EditForm from "./EditForm"

const EditPage = async ({params}: {params:{slug: string}}) => {
    const {slug} = await params
    const {data, error} = await getSinglePost(slug)

    return(
        <section className="w-330 m-auto max-[1355px]:w-full">
            <h1 className="mb-5 text-4xl font-bold">Edit Post</h1>
            {data && 
               <EditForm postId={data.id} initialValues={{title: data.title, content: data.content, image: data.image, price: data.price, category_id: data.categories?.id ?? null}} />
            }
        </section>
    )
}

export default EditPage
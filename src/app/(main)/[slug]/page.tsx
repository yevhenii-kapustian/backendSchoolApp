import { getSinglePost } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import { ImagesSection } from "./ImagesSection"
import { DescriptionSection } from "./DescriptionSection"
import { InfoSection } from "./InfoSection"
import { UserSection } from "./UserSection"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params

  const supabase = await createClient()

  const { data: post, error: postError } = await getSinglePost(slug)
  if (postError) return <p>Error: {postError.message}</p>
  if (!post) return <p>Post not found</p>

  const { data: { user } } = await supabase.auth.getUser()
  const isAuthor = user?.id === post.user_id
  console.log(user);
  

  return (
    <div className="w-fit m-auto">
        <Link href="/" className="w-fit flex items-center text-[#02282C] font-bold">
          <ChevronLeft size={30}/>
          Back
        </Link>

      <section className="w-fit mt-5 flex gap-5">
        <div className="p-5 flex items-center justify-center bg-white rounded max-w-[600px] min-w-[600px] min-h-[600px] w-full">
          {post.image?.length ? <ImagesSection images={post.image} /> : <p className="text-[#6f6f6f]">No Images</p> }
        </div>

        <div className="w-80 flex flex-col gap-5">
          <div className="p-5 bg-white rounded">
            <InfoSection createdTime={post.created_at} title={post.title} price={post.price} />
          </div>

          <div className="p-5 bg-white rounded">
            <UserSection userName={user?.user_metadata.username} createdTime={user!.created_at} />
          </div>
        </div>
      </section>

      <section className="p-5 bg-white rounded max-w-[600px] w-full mt-5">
        <DescriptionSection description={post.content} category={post.categories!.name} />
      </section>


      {isAuthor && (
        <section className="max-w-[600px] p-5 flex justify-end gap-5 mt-5 bg-white">
          <EditButton slug={slug} />
          <DeleteButton postId={post.id} />
        </section>
      )}
    </div>
  )
}

export default SinglePost
import { getSinglePost } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import { ImagesSection } from "./ImagesSection"
import { DescriptionSection } from "./DescriptionSection"

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params

  const supabase = await createClient()

  const { data: post, error: postError } = await getSinglePost(slug)
  if (postError) return <p>Error: {postError.message}</p>
  if (!post) return <p>Post not found</p>

  const { data: { user } } = await supabase.auth.getUser()
  const isAuthor = user?.id === post.user_id

  return (
    <div>
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <section>
        <DescriptionSection description={post.content} category={post.categories!.name} />
      </section>
      <p className="font-semibold">{post.price} $</p>

      <section>
        {post.image && <ImagesSection images={post.image} index={post.image.length}/>}
      </section>

      {isAuthor && (
        <div className="flex gap-2 mt-5">
          <DeleteButton postId={post.id} />
          <EditButton slug={slug} />
        </div>
      )}
    </div>
  )
}

export default SinglePost

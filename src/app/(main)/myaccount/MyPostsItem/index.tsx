import { UserPostsType } from "@/utils/supabase/queries"
import Link from "next/link"
import Image from "next/image"

const MyPostsItem = ({post}: {post: UserPostsType}) => {
    return(
        <>
        {post.map((item, index) => {
            const date = new Date(item.created_at)
            const createdDay = date.getDate()
            const createdMonth = date.toLocaleString('default', { month: 'long' });
            const createdYear = date.getFullYear()

            return(
                <Link key={index} href={item.slug} className="max-w-70 pb-4 flex flex-col gap-2 bg-white">
                    {item.image && item.image[0] ? (
                        <Image src={item.image[0]} alt={item.title} width={2000} height={2000} className="w-full aspect-[2/1] object-cover" />
                        ) : (
                            <div className="w-full aspect-[2/1] bg-gray-200 flex items-center justify-center">
                                No Images
                            </div>
                        )}
                        <div className="py-2 px-3 flex flex-col flex-1 justify-between text-[#393939] gap-1">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-xs opacity-70">Published {createdMonth} {createdDay}, {createdYear}</p>
                        </div>
                    </Link>
            )
        } )}
        </>
    )
}

export default MyPostsItem
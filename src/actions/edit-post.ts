'use server'

import { slugify } from "@/utils/sligify"
import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "@/utils/supabase/upload-image"

export const EditPost = async ({postId, userData}:{postId: number, userData: z.infer<typeof postSchema>}) => {
    const parsedData = postSchema.parse(userData)
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()
    
    const {data: post, error} = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single()
        
    if (!user || user.id !== post?.user_id) throw new Error("Not Authorised")

    const imageFile = userData.image?.get("image")
    let imagePublicUrl = post.image

    if (imageFile instanceof File) {
        imagePublicUrl = await uploadImage(imageFile)
    }

    const {data: updatedPost} = await supabase.from("posts")
                                                .update({
                                                    title: parsedData.title,
                                                    content: parsedData.content,
                                                    slug: slugify(parsedData.title),
                                                    image: imagePublicUrl,
                                                    category_id: parsedData.category_id
                                                })
                                                .eq("id", postId)
                                                .select("slug")
                                                .single()
                                                .throwOnError()

    if (error) throw error

    

    revalidatePath("/")
    redirect(`/${updatedPost.slug}`)
}
'use server'

import { slugify } from "@/utils/sligify"
import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImages } from "@/utils/supabase/upload-image"

export const EditPost = async ({postId, userData, currentImages}:{postId: number, currentImages: string[] | null, userData: z.infer<typeof postSchema>}) => {
    const parsedData = postSchema.parse(userData)
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()
    
    const {data: post, error} = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single()
        
    if (!user || user.id !== post?.user_id) throw new Error("Not Authorised")

    const imageFile = userData.image?.getAll("image")
    let imagePublicUrl
    const isValid = postSchema.safeParse(userData)

    if (imageFile?.every(item => (typeof item !== "string") && item !== undefined) ) {

        if (!isValid.success) return {error: "Malformed image file"}

        imagePublicUrl = await uploadImages(imageFile as File[])

        if (currentImages !== null) imagePublicUrl.push(...currentImages)
    } else (imagePublicUrl = currentImages)

    const {data: updatedPost} = await supabase.from("posts")
                                                .update({
                                                    title: parsedData.title,
                                                    content: parsedData.content,
                                                    slug: slugify(parsedData.title),
                                                    image: imagePublicUrl,
                                                    price: parsedData.price,
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
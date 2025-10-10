'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { slugify } from "@/utils/sligify"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "@/utils/supabase/upload-image"

export const CreatePost = async (userData: z.infer<typeof postSchema>) => {
    const parsetData = postSchema.parse(userData)

    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) {throw new Error("Not Authorized")}
    
    const slug = slugify(parsetData.title)
    const userId = user.id
    const imageFile = userData.image?.get("image")
    if (!(imageFile instanceof File) && imageFile !== null) throw new Error("Malformed image file")
    const imagePublicUrl = imageFile ? await uploadImage(imageFile) : null

    await supabase.from("posts")
                   .insert([{user_id: userId, slug: slug, ...parsetData, image: imagePublicUrl}])
                   .throwOnError()

    revalidatePath("/")
    redirect(`/${slug}`)
}
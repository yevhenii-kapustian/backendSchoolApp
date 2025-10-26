'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { slugify } from "@/utils/sligify"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImages } from "@/utils/supabase/upload-image"
import { v4 as uuid } from "uuid"

export const CreatePost = async (userData: z.infer<typeof postSchema>) => {
  const parsedData = postSchema.parse(userData)
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not Authorized")

  const slug = `${slugify(parsedData.title)}-${uuid().slice(0, 8)}`
  const userId = user.id


  const files: File[] = []
  if (userData.image) {
    for (const value of userData.image.values()) {
      if (value instanceof File) files.push(value)
    }
  }

  let imageUrls

  if (files.length > 0) {
    imageUrls = await uploadImages(files)
  } else {
    imageUrls = null
  }

    const { error: postError } = await supabase
    .from("posts")
    .insert([{ ...parsedData, user_id: userId, slug, image: imageUrls }])
    .select()
    .single()
  if (postError) throw postError


  revalidatePath("/")
  redirect(`/${slug}`)
}

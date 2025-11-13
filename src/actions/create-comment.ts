'use server'

import { z } from "zod"
import { createCommentSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const createComment = async (commentData: z.infer<typeof createCommentSchema>) => {
    const parsedData = createCommentSchema.parse(commentData)

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error("You must be logged in to comment")
    }

    const { data, error } = await supabase
        .from("comments")
        .insert({
            content: parsedData.content,
            post_id: parsedData.post_id,
            parent_id: parsedData.parent_id || null,
            user_id: user.id
        })
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath("/[slug]")

    return { data, error: null }
}

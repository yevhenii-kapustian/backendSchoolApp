'use server'

import { z } from "zod"
import { updateCommentSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const editComment = async (commentData: z.infer<typeof updateCommentSchema>) => {
    const parsedData = updateCommentSchema.parse(commentData)

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error("You must be logged in to edit comments")
    }

    const { data: existingComment, error: fetchError } = await supabase
        .from("comments")
        .select("user_id, post_id")
        .eq("id", parsedData.id)
        .single()

    if (fetchError || !existingComment) {
        throw new Error("Comment not found")
    }

    if (existingComment.user_id !== user.id) {
        throw new Error("You can only edit your own comments")
    }

    const { data, error } = await supabase
        .from("comments")
        .update({ content: parsedData.content })
        .eq("id", parsedData.id)
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath("/[slug]")

    return { data, error: null }
}

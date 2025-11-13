'use server'

import { z } from "zod"
import { deleteCommentSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const deleteComment = async (commentData: z.infer<typeof deleteCommentSchema>) => {
    const { id } = deleteCommentSchema.parse(commentData)
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) throw new Error("You must be logged in to delete comments")

    await supabase
            .from("comments")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id)
            .throwOnError()

    revalidatePath("/[slug]")
}

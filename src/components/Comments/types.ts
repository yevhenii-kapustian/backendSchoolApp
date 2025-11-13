import type { CommentType } from "@/utils/supabase/queries"

export interface CommentTree extends CommentType {
    replies: CommentTree[]
}

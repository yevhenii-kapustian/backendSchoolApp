'use client'

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/browser-client"
import { getComments } from "@/utils/supabase/queries"
import { useEffect, useState } from "react"
import CommentForm from "./CommentForm"
import CommentItem from "./CommentItem"
import type { CommentType } from "@/utils/supabase/queries"
import { MessageSquare } from "lucide-react"

interface CommentsProps {
    postId: number
}

interface CommentTree extends CommentType {
    replies: CommentTree[]
}

const Comments = ({ postId }: CommentsProps) => {
    const supabase = createClient()
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)

    // Fetch current user
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setCurrentUserId(user?.id || null)
        }
        fetchUser()
    }, [supabase])

    // Fetch comments
    const { data: commentsData, isLoading, error } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const { data, error } = await getComments(supabase, postId)
            if (error) throw new Error(error.message)
            return data || []
        }
    })

    // Build comment tree structure
    const buildCommentTree = (comments: CommentType[]): CommentTree[] => {
        const commentMap = new Map<number, CommentTree>()
        const rootComments: CommentTree[] = []

        // First pass: create map of all comments with empty replies array
        comments.forEach((comment) => {
            commentMap.set(comment.id, { ...comment, replies: [] })
        })

        // Second pass: build tree structure
        comments.forEach((comment) => {
            const commentWithReplies = commentMap.get(comment.id)!

            if (comment.parent_id === null) {
                // Root level comment
                rootComments.push(commentWithReplies)
            } else {
                // Reply to another comment
                const parent = commentMap.get(comment.parent_id)
                if (parent) {
                    parent.replies.push(commentWithReplies)
                } else {
                    // If parent not found, treat as root comment
                    rootComments.push(commentWithReplies)
                }
            }
        })

        return rootComments
    }

    const commentTree = commentsData ? buildCommentTree(commentsData) : []
    const totalComments = commentsData?.length || 0

    // Render comment tree recursively
    const renderComments = (comments: CommentTree[]) => {
        return comments.map((comment) => (
            <CommentItem
                key={comment.id}
                comment={comment}
                postId={postId}
                currentUserId={currentUserId}
                replies={comment.replies}
            />
        ))
    }

    if (error) {
        return (
            <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">Failed to load comments. Please try again.</p>
            </div>
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={24} className="text-[#02282C]" />
                <h2 className="text-2xl font-bold text-[#02282C]">
                    Comments {totalComments > 0 && `(${totalComments})`}
                </h2>
            </div>

            {/* Comment form for logged-in users */}
            {currentUserId ? (
                <div className="mb-8 p-4 bg-white rounded-lg border border-gray-200">
                    <CommentForm postId={postId} />
                </div>
            ) : (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm text-center">
                        Please <a href="/auth/login" className="text-[#0C74B0] font-semibold hover:underline">log in</a> to leave a comment
                    </p>
                </div>
            )}

            {/* Comments list */}
            <div className="space-y-1">
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="w-8 h-8 border-4 border-[#0C74B0] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : totalComments === 0 ? (
                    <div className="text-center py-8">
                        <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                    </div>
                ) : (
                    renderComments(commentTree)
                )}
            </div>
        </div>
    )
}

export default Comments

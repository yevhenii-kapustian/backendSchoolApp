'use client'

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/browser-client"
import { getComments } from "@/utils/supabase/queries"
import { useEffect, useState } from "react"
import CommentForm from "./CommentForm"
import CommentList from "./CommentList"
import CommentsHeader from "./CommentsHeader"
import EmptyState from "./EmptyState"
import LoginPrompt from "./LoginPrompt"
import LoadingState from "./LoadingState"
import type { CommentType } from "@/utils/supabase/queries"
import type { CommentTree } from "./types"

const Comments = ({ postId }: {postId: number}) => {
    const supabase = createClient()
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setCurrentUserId(user?.id || null)
        }
        fetchUser()
    }, [supabase])

    const { data: commentsData, isLoading, error } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const { data, error } = await getComments(supabase, postId)
            if (error) throw new Error(error.message)
            return data || []
        }
    })

    const buildCommentTree = (comments: CommentType[]): CommentTree[] => {
        const commentMap = new Map<number, CommentTree>()
        const rootComments: CommentTree[] = []

        comments.forEach((comment) => {
            commentMap.set(comment.id, { ...comment, replies: [] })
        })

        comments.forEach((comment) => {
            const commentWithReplies = commentMap.get(comment.id)!

            if (comment.parent_id === null) {
                rootComments.push(commentWithReplies)
            } else {
                const parent = commentMap.get(comment.parent_id)
                if (parent) {
                    parent.replies.push(commentWithReplies)
                } else {
                    rootComments.push(commentWithReplies)
                }
            }
        })

        return rootComments
    }

    const commentTree = commentsData ? buildCommentTree(commentsData) : []
    const totalComments = commentsData?.length || 0

    if (error) {
        return (
            <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">Failed to load comments. Please try again.</p>
            </div>
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto scroll-mt-[calc(50vh-100px)]" id="comments-section">
            <CommentsHeader totalComments={totalComments} />

            {currentUserId ? (
                <div className="mb-8 p-4 bg-white rounded-lg border border-gray-200">
                    <CommentForm postId={postId} />
                </div>
            ) : (
                <LoginPrompt />
            )}

            {isLoading ? (
                <LoadingState />
            ) : totalComments === 0 ? (
                <EmptyState />
            ) : (
                <CommentList
                    comments={commentTree}
                    postId={postId}
                    currentUserId={currentUserId}
                />
            )}
        </div>
    )
}

export default Comments

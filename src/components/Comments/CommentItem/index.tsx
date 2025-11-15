'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "@/actions/delete-comment"
import { toast } from "sonner"
import CommentForm from "../CommentForm"
import CommentHeader from "../CommentHeader"
import CommentContent from "../CommentContent"
import CommentActions from "../CommentActions"
import type { CommentTree } from "../types"

interface CommentItemProps {
    comment: CommentTree
    postId: number
    currentUserId?: string | null
    replies: CommentTree[]
    depth?: number
}

const CommentItem = ({ comment, postId, currentUserId, replies, depth = 0 }: CommentItemProps) => {
    const queryClient = useQueryClient()
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [showReplies, setShowReplies] = useState(true)

    const isOwner = currentUserId === comment.user_id
    const maxDepth = 5
    const canReply = !!currentUserId && depth < maxDepth

    const deleteMutation = useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            toast.success("Comment deleted")
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete comment")
        }
    })

    const handleDelete = () => {
        deleteMutation.mutate({ id: comment.id })
    }

    const handleReplySuccess = () => {
        setShowReplyForm(false)
    }

    const handleEditSuccess = () => {
        setIsEditing(false)
    }

    return (
        <div className={`${depth > 0 ? 'ml-6 sm:ml-8 md:ml-12' : ''} mt-4`}>
            <div className="flex-1 min-w-0">
                <CommentHeader
                    username={comment.users?.username || 'Unknown User'}
                    createdAt={comment.created_at}
                />

                {isEditing ? (
                    <div className="mt-2">
                        <CommentForm
                            postId={postId}
                            mode="edit"
                            existingComment={{ id: comment.id, content: comment.content }}
                            onCancel={() => setIsEditing(false)}
                            onSuccess={handleEditSuccess}
                        />
                    </div>
                ) : (
                    <CommentContent content={comment.content} />
                )}

                {!isEditing && (
                    <CommentActions
                        isOwner={isOwner}
                        canReply={canReply}
                        replyCount={replies.length}
                        showReplies={showReplies}
                        isDeleting={deleteMutation.isPending}
                        onReply={() => setShowReplyForm(!showReplyForm)}
                        onEdit={() => setIsEditing(true)}
                        onDelete={handleDelete}
                        onToggleReplies={() => setShowReplies(!showReplies)}
                    />
                )}

                {showReplyForm && (
                    <div className="mt-3">
                        <CommentForm
                            postId={postId}
                            parentId={comment.id}
                            onCancel={() => setShowReplyForm(false)}
                            onSuccess={handleReplySuccess}
                        />
                    </div>
                )}

                {showReplies && replies.length > 0 && (
                    <div className="mt-2">
                        {replies.map((reply) => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                postId={postId}
                                currentUserId={currentUserId}
                                replies={reply.replies}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentItem

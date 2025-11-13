'use client'

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { MessageCircle, Edit2, Trash2, User } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "@/actions/delete-comment"
import { toast } from "sonner"
import CommentForm from "./CommentForm"
import type { CommentType } from "@/utils/supabase/queries"

interface CommentTree extends CommentType {
    replies: CommentTree[]
}

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
    const maxDepth = 5 // Maximum nesting level

    // Delete mutation
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
        if (confirm("Are you sure you want to delete this comment?")) {
            deleteMutation.mutate({ id: comment.id })
        }
    }

    const handleReplySuccess = () => {
        setShowReplyForm(false)
    }

    const handleEditSuccess = () => {
        setIsEditing(false)
    }

    return (
        <div className={`${depth > 0 ? 'ml-6 sm:ml-8 md:ml-12' : ''} mt-4`}>
            <div className="flex gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#02282C] to-[#23e5db] flex items-center justify-center">
                        <User color="white" size={20} />
                    </div>
                </div>

                {/* Comment content */}
                <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-3">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-sm text-[#02282C]">
                                {comment.users?.username || 'Unknown User'}
                            </span>
                            <span className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                            </span>
                        </div>

                        {/* Content or Edit Form */}
                        {isEditing ? (
                            <CommentForm
                                postId={postId}
                                mode="edit"
                                existingComment={{ id: comment.id, content: comment.content }}
                                onCancel={() => setIsEditing(false)}
                                onSuccess={handleEditSuccess}
                            />
                        ) : (
                            <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                                {comment.content}
                            </p>
                        )}
                    </div>

                    {/* Action buttons */}
                    {!isEditing && (
                        <div className="flex items-center gap-3 mt-2 ml-1">
                            {currentUserId && depth < maxDepth && (
                                <button
                                    onClick={() => setShowReplyForm(!showReplyForm)}
                                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#0C74B0] transition-colors"
                                >
                                    <MessageCircle size={14} />
                                    <span>Reply</span>
                                </button>
                            )}

                            {isOwner && (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#0C74B0] transition-colors"
                                    >
                                        <Edit2 size={14} />
                                        <span>Edit</span>
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        disabled={deleteMutation.isPending}
                                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
                                    >
                                        <Trash2 size={14} />
                                        <span>Delete</span>
                                    </button>
                                </>
                            )}

                            {replies.length > 0 && (
                                <button
                                    onClick={() => setShowReplies(!showReplies)}
                                    className="text-xs text-gray-600 hover:text-[#0C74B0] transition-colors"
                                >
                                    {showReplies ? 'Hide' : 'Show'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Reply form */}
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

                    {/* Nested replies */}
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
        </div>
    )
}

export default CommentItem

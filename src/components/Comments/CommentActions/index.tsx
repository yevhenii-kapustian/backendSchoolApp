import { MessageCircle, Edit2, Trash2 } from "lucide-react"

interface CommentActionsProps {
    isOwner: boolean
    canReply: boolean
    replyCount: number
    showReplies: boolean
    isDeleting: boolean
    onReply: () => void
    onEdit: () => void
    onDelete: () => void
    onToggleReplies: () => void
}

const CommentActions = ({
    isOwner,
    canReply,
    replyCount,
    showReplies,
    isDeleting,
    onReply,
    onEdit,
    onDelete,
    onToggleReplies
}: CommentActionsProps) => {
    return (
        <div className="flex items-center gap-3 mt-2 ml-1">
            {canReply && (
                <button
                    onClick={onReply}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#0C74B0] transition-colors cursor-pointer"
                >
                    <MessageCircle size={14} />
                    <span>Reply</span>
                </button>
            )}

            {isOwner && (
                <>
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#0C74B0] transition-colors cursor-pointer"
                    >
                        <Edit2 size={14} />
                        <span>Edit</span>
                    </button>

                    <button
                        onClick={onDelete}
                        disabled={isDeleting}
                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <Trash2 size={14} />
                        <span>Delete</span>
                    </button>
                </>
            )}

            {replyCount > 0 && (
                <button
                    onClick={onToggleReplies}
                    className="text-xs text-gray-600 hover:text-[#0C74B0] transition-colors cursor-pointer"
                >
                    {showReplies ? 'Hide' : 'Show'} {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
                </button>
            )}
        </div>
    )
}

export default CommentActions

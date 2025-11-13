import CommentItem from "../CommentItem"
import type { CommentTree } from "../types"

interface CommentListProps {
    comments: CommentTree[]
    postId: number
    currentUserId: string | null
}

const CommentList = ({ comments, postId, currentUserId }: CommentListProps) => {
    return (
        <div className="space-y-1">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    postId={postId}
                    currentUserId={currentUserId}
                    replies={comment.replies}
                />
            ))}
        </div>
    )
}

export default CommentList

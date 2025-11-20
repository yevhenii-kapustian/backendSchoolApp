import { formatDistanceToNow } from "date-fns"
import { User } from "lucide-react"

interface CommentHeaderProps {
    username: string
    createdAt: string
}

const CommentHeader = ({ username, createdAt }: CommentHeaderProps) => {
    return (
        <div className="flex gap-3">
            <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                    <User color="white" size={20} />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[#02282C]">
                    {username || 'Unknown User'}
                </span>
                <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                </span>
            </div>
        </div>
    )
}

export default CommentHeader

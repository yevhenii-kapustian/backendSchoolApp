import { MessageSquare } from "lucide-react"

const CommentsHeader = ({ totalComments }: {totalComments: number}) => {
    return (
        <div className="flex items-center gap-2 mb-6">
            <MessageSquare size={24} className="text-[#02282C]" />
            <h2 className="text-2xl font-bold text-[#02282C]">
                Comments {totalComments > 0 && `(${totalComments})`}
            </h2>
        </div>
    )
}

export default CommentsHeader

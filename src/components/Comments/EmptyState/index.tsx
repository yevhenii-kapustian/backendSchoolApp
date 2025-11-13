import { MessageSquare } from "lucide-react"

const EmptyState = () => {
    return (
        <div className="text-center py-8">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
    )
}

export default EmptyState

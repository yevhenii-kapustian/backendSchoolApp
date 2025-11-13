const CommentContent = ({ content }: { content: string }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-3 mt-2">
            <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                {content}
            </p>
        </div>
    )
}

export default CommentContent

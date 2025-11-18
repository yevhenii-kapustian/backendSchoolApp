'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "@/actions/create-comment"
import { editComment } from "@/actions/edit-comment"
import { createCommentSchema, updateCommentSchema } from "@/actions/schemas"
import { z } from "zod"
import ErrorMessage from "@/components/ErrorMessage"
import { useState } from "react"
import { toast } from "sonner"

interface CommentFormProps {
    postId: number
    parentId?: number | null
    mode?: 'create' | 'edit'
    existingComment?: { id: number; content: string }
    onCancel?: () => void
    onSuccess?: () => void
}

const CommentForm = ({ postId, parentId = null, mode = 'create', existingComment, onCancel, onSuccess }: CommentFormProps) => {
    const queryClient = useQueryClient()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const schema = mode === 'create' ? createCommentSchema : updateCommentSchema

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: mode === 'edit' && existingComment
            ? { content: existingComment.content, id: existingComment.id }
            : { content: '', post_id: postId, parent_id: parentId }
    })

    const createMutation = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            toast.success("Comment posted!")
            reset()
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            onSuccess?.()
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to post comment")
        },
        onSettled: () => {
            setIsSubmitting(false)
        }
    })

    const editMutation = useMutation({
        mutationFn: editComment,
        onSuccess: () => {
            toast.success("Comment updated!")
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            onSuccess?.()
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update comment")
        },
        onSettled: () => {
            setIsSubmitting(false)
        }
    })

    const onSubmit = handleSubmit((values) => {
        setIsSubmitting(true)

        if (mode === 'create') {
            createMutation.mutate(values as z.infer<typeof createCommentSchema>)
        } else {
            editMutation.mutate(values as z.infer<typeof updateCommentSchema>)
        }
    })

    return (
        <form onSubmit={onSubmit} className="w-full">
            <fieldset className="flex flex-col gap-2">
                <textarea
                    {...register(mode === 'create' ? 'content' : 'content')}
                    placeholder={parentId ? "Write a reply..." : "Write a comment..."}
                    rows={3}
                    className="w-full p-3 border border-[#BEBEBE] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0C74B0] transition-all text-sm sm:text-base"
                    disabled={isSubmitting}
                />
                {errors.content && <ErrorMessage message={errors.content.message ?? ""} />}
            </fieldset>

            <div className="mt-3 flex items-center gap-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-[#02282C] text-white rounded font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {isSubmitting ? "Posting..." : mode === 'edit' ? "Update" : parentId ? "Reply" : "Comment"}
                </button>

                {(mode === 'edit' || parentId) && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}

export default CommentForm

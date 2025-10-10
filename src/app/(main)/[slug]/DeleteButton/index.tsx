'use client'

import { DeletePost } from "@/actions/delete-post"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteButton = ({postId}: {postId: number}) => {
    const { mutate } = useMutation({
        mutationFn: DeletePost,
        onMutate: () => toast("Deleting your post"),
        onSettled: () => toast.success("Post deleted!")
    })

    return <button onClick={() => mutate(postId)} className="button-tertiary">Delete me!</button>
}

export default DeleteButton
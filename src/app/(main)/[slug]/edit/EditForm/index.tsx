'use client'

import { EditPost } from "@/actions/edit-post"
import {Tables} from "@/utils/supabase/database-types"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchemaImage } from "@/actions/schemas"
import { useState } from "react"

const EditForm = ({postId, initialValues}: {postId: number, initialValues: Pick<Tables<'posts'>, "title" | "content" | "image">}) => {

    const [preview, setPreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
      
    const {register, handleSubmit, setValue} = useForm({
        resolver: zodResolver(postSchemaImage),
        defaultValues: {
            title: initialValues.title,
            content: initialValues.content || undefined,
            image: initialValues.image
        }
    })

    const { mutate, error } = useMutation({
        mutationFn: EditPost
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setValue("image", files)
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

    return(
        <form onSubmit={handleSubmit((values) => {
            const imageForm = new FormData()
            if (selectedFile) {
                imageForm.append("image", selectedFile)
            }

        mutate({
            postId,
            userData: {
                title: values.title,
                content: values.content,
                image: imageForm,
            }
        })
        })}>
             <fieldset className="mt-5 flex flex-col gap-2">
                    <label htmlFor="title" className="font-bold">Post Title</label>
                    <input className="p-2 border border-[#BEBEBE] rounded" id="title" {...register("title")} placeholder="Example: Main Header, Blog Page, Search Results"/>
                </fieldset>

                <fieldset className="mt-4 flex flex-col gap-2">
                    <label htmlFor="content" className="font-bold">Description</label>
                    <textarea className="p-2 border border-[#BEBEBE] rounded resize-none" id="content" {...register("content")} placeholder="Write Something..." rows={7} />
                </fieldset>
                
               <div className="mt-4 relative flex flex-col items-center border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
                       <input
                           type="file"
                           id="image"
                           accept="image/png, image/jpeg"
                           {...register("image")}
                           onChange={handleFileChange}
                           className="hidden"
                       />
                       <label htmlFor="image" className="h-full w-full cursor-pointer flex flex-col items-center">
                         {preview ? (
                           <Image
                               src={preview}
                               alt="preview"
                               width={500}
                               height={500}
                               style={{width: "500", height: "auto"}}
                               className="w-40 h-40 object-cover rounded-lg mb-2"
                           />
                         ) : initialValues.image ? (
                            <Image src={initialValues.image} alt={initialValues.title} width={500} height={500} style={{width: "500", height: "auto"}}/>
                         ) : (
                            <>
                                <span className="text-gray-600 mb-2">Click to upload an image</span>
                                <span className="text-sm text-gray-400">(PNG or JPG)</span>
                            </>
                         )}
                       </label>
                     </div>
                <button>Submit</button>
        </form>
    )
}

export default EditForm
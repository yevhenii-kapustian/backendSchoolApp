'use client'

import { EditPost } from "@/actions/edit-post"
import {Tables} from "@/utils/supabase/database-types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchemaImage } from "@/actions/schemas"
import { useState } from "react"
import { createClient } from "@/utils/supabase/browser-client"

const supabase = createClient()

const EditForm = ({postId, initialValues}: {postId: number, initialValues: Pick<Tables<'posts'>, "title" | "content" | "image" | "category_id" | "price">}) => {

    const [preview, setPreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const { data: categories = [] } = useQuery({
            queryKey: ['categories'],
            queryFn: async () => {
            const { data, error } = await supabase.from('categories').select('*').order('name')
            if (error) throw new Error(error.message)
            return data || []
        }
    })
      
    const {register, handleSubmit, setValue} = useForm({
        resolver: zodResolver(postSchemaImage),
        defaultValues: {
            title: initialValues.title,
            content: initialValues.content || undefined,
            category_id: initialValues.category_id ?? undefined,
            image: initialValues.image,
            price: initialValues.price
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
                price: values.price,
                category_id: values.category_id
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

                 <fieldset className="mt-4 flex flex-col gap-2">
                    <label htmlFor="content" className="font-bold">Description</label>
                    <select
                        className="p-2 border border-[#BEBEBE] rounded"
                        {...register("category_id")}
                        id="category"      
                    >
                        <option>Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
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
            
                 <div className="mt-2 p-5 bg-white rounded">
            <h3 className="button-secondary w-fit px-10 text-base font-semibold">Sell</h3>
            <fieldset className="mt-5 flex flex-col gap-2">
                <label htmlFor="title" className="text-sm">Price *</label>
                <input
                    className="w-2/3 p-2 border border-[#BEBEBE] rounded"
                    {...register("price")}
                    id="price"
                />
            </fieldset>
        </div>
            <button>Submit</button>
        </form>
    )
}

export default EditForm
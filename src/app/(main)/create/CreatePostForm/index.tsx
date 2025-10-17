'use client'

import { postSchemaImage } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreatePost } from "@/actions/create-post"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import Image from "next/image"
import ErrorMessage from "@/components/ErrorMessage"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/browser-client"

const supabase = createClient()

const CreatePostForm = () => {
    const [preview, setPreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data, error } = await supabase.from('categories').select('*').order('name')
            if (error) throw new Error(error.message)
            return data
        }
    })

    const { register, handleSubmit, setValue, formState: {errors} } = useForm({
        resolver: zodResolver(postSchemaImage),
    })

    const { mutate, error, isPending } = useMutation({
        mutationFn: CreatePost,
        onSettled: () => toast.success("Post Created")
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

  return (
    <>
    <h1 className="mb-5 text-4xl font-bold">Create Post</h1>

    <form
        onSubmit={handleSubmit((values) => {
            const imageForm = new FormData()

            if (selectedFile) {
                imageForm.append("image", selectedFile)
            }

        mutate({
            title: values.title,
            content: values.content,
            image: imageForm,
            category_id: values.category_id
        })
        })}
        className="flex flex-col"
        >

        <div className="p-5 bg-white rounded">
            <h3 className="text-xl font-semibold">Describe in detail</h3>

            <fieldset className="mt-5 flex flex-col gap-2">
                <label htmlFor="title" className="text-sm">Please enter a title *</label>
                <input
                    className="w-2/3 p-2 border border-[#BEBEBE] rounded"
                    {...register("title")}
                    id="title"
                    placeholder="Example: iphone 11 with warranty"
                />
                <ErrorMessage message={errors.title?.message ?? ""} />
            </fieldset>

            <fieldset className="mt-4 flex flex-col gap-2">
                <label htmlFor="category" className="text-sm">Category *</label>
                <select
                    className="w-2/5 py-4 px-2 border text-[#6d6d6d] bg-[#F2F4F5] border-[#BEBEBE] rounded"
                    {...register("category_id")}
                    id="category"      
                >
                    <option>Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <ErrorMessage message={errors.category_id?.message ?? ""} />
            </fieldset>
        </div>

        <div className="mt-2 p-5 bg-white rounded">
            <h3 className="text-xl font-semibold">Pictures</h3>
            <div className="w-2/3 mt-4 relative flex flex-col items-center border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
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
                    ) : (
                    <>
                    <span className="text-gray-600 mb-2">Click to upload an image</span>
                    <span className="text-sm text-gray-400">(PNG or JPG)</span>
                    </>
                    )}
                </label>
            </div>
        </div>

        <div className="mt-2 p-5 bg-white rounded">
            <fieldset className="mt-4 flex flex-col gap-2">
                <label htmlFor="content" className="text-sm">Description *</label>
                <textarea
                    className="w-2/3 p-2 border border-[#BEBEBE] rounded resize-none"
                    {...register("content")}
                    id="content"
                    placeholder="Think about what details you'd like to see in the ad and add them to the description."
                    rows={7}          
                />
                <ErrorMessage message={errors.content?.message ?? ""} />
            </fieldset>
        </div>

        <div className="mt-2 p-5 bg-white flex justify-end">
            <button className="button-secondary text-base w-35 cursor-pointer">{isPending ? "Pending..." : "Publish"}</button>
        </div>
    </form>
    {error && <ErrorMessage message={error.message}/>}
    </>
  )
}

export default CreatePostForm
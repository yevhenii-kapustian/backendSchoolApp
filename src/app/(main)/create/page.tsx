'use client'

import { postSchemaImage } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreatePost } from "@/actions/create-post"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import ErrorMessage from "@/components/ErrorMessage"
import { toast } from "sonner"

const CreatePage = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
        })
      })}
      className="w-1/2 m-auto p-5 flex flex-col border rounded-lg shadow-sm"
    >
      <div className="pb-5 flex justify-between items-center border-b border-[#BEBEBE]">
        <h1 className="text-2xl font-bold">Create Post</h1>
        <Link href="/"><X /></Link>
      </div>

      <fieldset className="mt-5 flex flex-col gap-2">
        <label htmlFor="title" className="font-bold">Post Title</label>
        <input
          className="p-2 border border-[#BEBEBE] rounded"
          {...register("title")}
          id="title"
          placeholder="Example: Main Header, Blog Page, Search Results"
        />
        <ErrorMessage message={errors.title?.message ?? ""} />
      </fieldset>

      <fieldset className="mt-4 flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">Description</label>
        <textarea
          className="p-2 border border-[#BEBEBE] rounded resize-none"
          {...register("content")}
          id="content"
          placeholder="Write Something..."
          rows={7}          
        />
        <ErrorMessage message={errors.content?.message ?? ""} />
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
          ) : (
            <>
              <span className="text-gray-600 mb-2">Click to upload an image</span>
              <span className="text-sm text-gray-400">(PNG or JPG)</span>
            </>
          )}
        </label>
      </div>

      <button className="button-secondary w-1/2 m-auto mt-6">{isPending ? "Pending..." : "Create Post"}</button>
    </form>
    {error && <ErrorMessage message={error.message}/>}
    </>
  )
}

export default CreatePage

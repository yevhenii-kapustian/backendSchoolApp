'use client'

import { EditPost } from "@/actions/edit-post"
import { Tables } from "@/utils/supabase/database-types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchemaImage } from "@/actions/schemas"
import { useRef, useState } from "react"
import { createClient } from "@/utils/supabase/browser-client"
import { X, Undo2 } from "lucide-react"
import ErrorMessage from "@/components/ErrorMessage"
import Link from "next/link"
import { useParams } from "next/navigation"

const supabase = createClient()

const EditForm = ({postId, initialValues}: {postId: number, initialValues: Pick<Tables<'posts'>, "title" | "content" | "image" | "category_id" | "price">}) => {
    const {slug} = useParams()
    
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [existingImages, setExistingImages] = useState<string[] | null>(initialValues.image)    
    const [titleCharacters, setTitleCharacters] = useState<number>(0)
    const [descriptionCharacters, setDescriptionCharacters] = useState<number>(0)
    
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const { data: categories = [] } = useQuery({
            queryKey: ['categories'],
            queryFn: async () => {
            const { data, error } = await supabase.from('categories').select('*').order('name')
            if (error) throw new Error(error.message)
            return data || []
        }
    })
      
    const {register, handleSubmit, setValue, formState: { errors }} = useForm({
        resolver: zodResolver(postSchemaImage),
        defaultValues: {
            title: initialValues.title,
            content: initialValues.content || undefined,
            category_id: initialValues.category_id ?? undefined,
            image: null,
            price: initialValues.price
        }
    })

    const { mutate, error, isPending } = useMutation({
        mutationFn: EditPost
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const filesArray = Array.from(e.target.files)
        setSelectedFiles(prev => [...prev, ...filesArray])
        setValue("image", [...selectedFiles, ...filesArray])
    }

    const handleContainerClick = () => {
        fileInputRef.current?.click()
    }

    const handleRemovePictures = () => {
        setSelectedFiles([])
        setExistingImages([])
    }

    const handleSubmitForm = handleSubmit((values) => {
        let imageForm: null | FormData = null

            if (values.image && values.image.length > 0) {
                imageForm = new FormData()
                selectedFiles.forEach((file) => {
                    imageForm!.append("image", file)
                })
            }

        mutate({
            postId,
            userData: {
                title: values.title,
                content: values.content,
                image: imageForm,
                price: values.price,
                category_id: values.category_id,
            },
            currentImages: existingImages ?? null
        })
    })
    
    return(
        <>
        <form onSubmit={handleSubmitForm} className="flex flex-col">
            <div className="p-5 bg-white rounded">
                <h3 className="text-xl font-semibold">Describe in detail</h3>

                <fieldset className="mt-5 flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm">Please enter a title *</label>
                    <input className="w-2/3 p-2 border border-[#BEBEBE] rounded" 
                            {...register("title")} 
                            id="title" 
                            placeholder="Example: iphone 11 with warranty"
                            onChange={(e) => setTitleCharacters(e.target.value.length)}
                    />
                    <div className="w-2/3 flex items-center justify-between text-sm text-[#6f6f6f]">
                        <p>Please enter at least 12 characters</p>
                        <p>{titleCharacters}/70</p>
                    </div>
                    <ErrorMessage message={errors.title?.message ?? ""} />
                </fieldset>

                <fieldset className="mt-4 flex flex-col gap-2">
                    <label htmlFor="content" className="text-sm">Category *</label>
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

                <div className="relative w-2/3 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-2 border-dashed border-gray-400 rounded-xl p-6">
                    <X className="absolute right-[-15px] top-[-15px] bg-white rounded-2xl cursor-pointer" size={30} onClick={handleRemovePictures} color="gray"/>
                    <input
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg"
                        {...register("image")}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={selectedFiles.length >= 4}
                    />

                    {existingImages && existingImages.map((src, i) => (
                                            <Image
                                                key={Math.random()}
                                                src={src}
                                                alt={`preview-${i}`}
                                                width={100}
                                                height={100}
                                                className={`w-full aspect-square object-cover rounded-lg ${selectedFiles.length >=4 && "cursor-default"}`}
                                            />
                    ))}

                    {selectedFiles.length > 0 && selectedFiles.map((src, i) => (
                                            <Image
                                                key={i}
                                                src={window.URL.createObjectURL(src)}
                                                alt={`preview-${i}`}
                                                width={100}
                                                height={100}
                                                className={`w-full aspect-square object-cover rounded-lg ${selectedFiles.length >=4 && "cursor-default"}`}
                                            />
                    ))}

                    {Array.from({ length: Math.max(0, 4 - (existingImages ? existingImages.length : 0) - (selectedFiles ? selectedFiles.length : 0) ) }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-full aspect-square flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-sm cursor-pointer"
                                                onClick={handleContainerClick}
                                            >
                                                +
                                            </div>
                    ))}
                </div>
                <p className="text-sm text-gray-400 mt-2">Up to 4 images (PNG or JPG)</p>
            </div>

            <div className="mt-2 p-5 bg-white rounded">
                <fieldset className="mt-4 flex flex-col gap-2">
                    <label htmlFor="content" className="text-sm">Description *</label>
                    <textarea 
                            className="w-2/3 p-4 border border-[#BEBEBE] rounded resize-none" 
                            {...register("content")} 
                            id="content" 
                            onChange={(e) => setDescriptionCharacters(e.target.value.length)}
                            placeholder="Think about what details you'd like to see in the ad and add them to the description" 
                            rows={7} 
                    />
                    <div className="w-2/3 flex items-center justify-between text-sm text-[#6f6f6f]">
                        <p>Please enter at least 40 characters</p>
                        <p>{descriptionCharacters}/9000</p>
                    </div>
                    <ErrorMessage message={errors.content?.message ?? ""} />
                </fieldset>
            </div>

            <div className="mt-2 p-5 bg-white rounded">
                <h3 className="button-secondary w-fit px-10 text-base font-semibold">Sell</h3>
                <fieldset className="mt-5 flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm">Price *</label>
                    <div className="w-1/4 flex items-center border border-[#BEBEBE] rounded">    
                        <input
                            className="w-full p-2"
                            {...register("price")}
                            id="price"
                        />
                        <span className="px-3">$</span>
                    </div>
                    <ErrorMessage message={errors.price?.message ?? ""} />
                </fieldset>
            </div>

            <div className="mt-2 p-5 bg-white flex justify-end items-center gap-5">
                <Link href=""
                        onClick={(e) => {
                                        e.preventDefault()
                                        window.location.href = `/${slug}`
                                }}
                        className="w-fit py-2 px-4 flex items-center gap-2 text-base text-center font-bold border-b cursor-pointer"
                >
                    <p>Cancel</p>
                    <Undo2 size={18}/>
                </Link>
                <button className="button-secondary text-base w-35 cursor-pointer">{isPending ? "Pending..." : "Publish"}</button>
            </div>
        </form>
        {error && <ErrorMessage message={error.message}/>}
        </>
    )
}

export default EditForm
'use client'

import { postSchemaImage } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreatePost } from "@/actions/create-post"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState, useRef } from "react"
import Image from "next/image"
import ErrorMessage from "@/components/ErrorMessage"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/browser-client"
import Link from "next/link"
import { Undo2, X, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

const supabase = createClient()

const CreatePostForm = () => {
  const router = useRouter()

  const [previews, setPreviews] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [titleCharacters, setTitleCharacters] = useState<number>(0)
  const [descriptionCharacters, setDescriptionCharacters] = useState<number>(0)
  const [selectedCategory, setSelectedCategory] = useState<{id: number, name: string} | null>(null)
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const categoryRef = useRef<HTMLDivElement | null>(null)

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('name')
      if (error) throw new Error(error.message)
      return data
    }
  })

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(postSchemaImage),
  })

  const { mutate, error, isPending } = useMutation({
    mutationFn: CreatePost,
    onSettled: () => toast.success("Post Created")
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const filesArray = Array.from(e.target.files)
    setSelectedFiles(prev => [...prev, ...filesArray])

    const newPreviews = filesArray.map(file => URL.createObjectURL(file))
    setPreviews(prev => [...prev, ...newPreviews])
    setValue("image", [...selectedFiles, ...filesArray])
  }

  const handleSubmitForm = handleSubmit((values) => {
    const formData = new FormData()
    formData.append("title", values.title)
    formData.append("content", values.content)
    formData.append("price", String(values.price))
    formData.append("category_id", values.category_id)

    selectedFiles.forEach((file) => {
      formData.append("image", file)
    })

    mutate({
      ...values,
      image: formData
    })
  })

  const handleContainerClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemovePictures = () => {
    setPreviews([])
    setSelectedFiles([])
  }

  const handleCategorySelect = (category: typeof categories[0]) => {
    setSelectedCategory({id: Number(category.id), name: category.name ?? ''})
    setValue("category_id", String(category.id))
    setIsCategoryOpen(false)
  }

  const handleCategoryToggle = (e: React.MouseEvent<HTMLDivElement>) => {
  if (!(e.target as HTMLElement).closest('.category-dropdown')) {
    setIsCategoryOpen(false)
  }

  if (!isCategoryOpen) {
            const closeOnOutsideClick = (event: MouseEvent) => {
                const target = event.target as HTMLElement;
                if (!categoryRef.current?.contains(target)) {
                    setIsCategoryOpen(false);
                    document.removeEventListener('mousedown', closeOnOutsideClick);
                }
            };
            document.addEventListener('mousedown', closeOnOutsideClick);
        }
}

  return (
    <>
    <form
        onSubmit={handleSubmitForm}
        className="flex flex-col"
        >

        <div className="p-5 bg-white rounded">
            <h3 className="text-xl text-[#02282CFF] font-semibold">Describe in detail</h3>

            <fieldset className="mt-5 flex flex-col gap-2">
                <label htmlFor="title" className="text-sm text-[#02282c]">Please enter a title *</label>
                <input
                    className="w-2/3 py-2 px-4 border border-[#BEBEBE] rounded max-sm:w-full"
                    {...register("title")}
                    id="title"
                    placeholder="Example: iphone 11 with warranty"
                    onChange={(e) => setTitleCharacters(e.target.value.length)}
                />
                <div className="w-2/3 flex items-center justify-between text-sm text-[#6f6f6f] max-sm:w-full">
                    <p>Please enter at least 12 characters</p>
                    <p>{titleCharacters}/70</p>
                </div>
                <ErrorMessage message={errors.title?.message ?? ""} />
            </fieldset>

            <fieldset className="mt-4 flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#02282CFF]">Category *</label>
                <p className="text-xs text-[#6f6f6f]">Choose the category that best fits your post</p>

                <div onClick={handleCategoryToggle}>
                  <div ref={categoryRef} className="relative w-full sm:w-2/5 category-dropdown">
                      <input
                          type="hidden"
                          {...register("category_id")}
                          value={selectedCategory?.id ? String(selectedCategory.id) : ""}
                      />

                      <button
                          type="button"
                          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                          className={`
                              w-full py-4 px-4
                              border rounded-lg
                              text-left capitalize cursor-pointer
                              transition-all duration-200
                              flex items-center justify-between
                              ${selectedCategory ? 'text-[#02282C]' : 'text-[#6d6d6d]'}
                          `}
                      >
                          <span>{selectedCategory?.name ?? 'Select a category'}</span>
                          <ChevronDown
                              className={`w-5 h-5 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}
                          />
                      </button>

                      <div
                          className={`
                              absolute top-full left-0 right-0 mt-2
                              bg-white rounded-lg shadow-lg border-2 border-gray-200
                              max-h-[300px] overflow-y-auto
                              z-50
                              transform transition-all duration-300 ease-out origin-top
                              ${isCategoryOpen
                                  ? 'opacity-100 scale-y-100 translate-y-0'
                                  : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                              }
                          `}
                      >
                          {categories.map((category) => (
                              <button
                                  key={category.id}
                                  type="button"
                                  onClick={() => handleCategorySelect(category)}
                                  className={`
                                      w-full px-4 py-3 text-left capitalize
                                      transition-colors duration-150 cursor-pointer
                                      flex items-center justify-between
                                      ${selectedCategory?.id === Number(category.id)
                                              ? 'bg-gradient-to-r from-[#02282C] to-[#23e5db] text-white'
                                              : 'hover:bg-[#23e5db]/10 text-[#02282C]'
                                      }
                                      border-b border-gray-100 last:border-b-0
                                  `}
                              >
                                  <span className="flex items-center gap-3">
                                      {category.name}
                                  </span>
                              </button>
                          ))}
                      </div>
                  </div>
                </div>

                <ErrorMessage message={errors.category_id?.message ?? ""} />
            </fieldset>
        </div>

        <div className="mt-2 p-5 bg-white rounded">
          <h3 className="text-xl text-[#02282c] font-semibold">Pictures</h3>

          <div className="relative w-2/3 max-sm:w-full mt-4 grid grid-cols-4 max-lg:grid-cols-2 gap-3 border-2 border-dashed border-gray-400 rounded-xl p-6">
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

            {previews.map((src, i) => (
                                      <Image
                                            key={i}
                                            src={src}
                                            alt={`preview-${i}`}
                                            width={100}
                                            height={100}
                                            className={`w-full aspect-square object-cover rounded-lg ${selectedFiles.length >=4 && "cursor-default"}`}
                                      />
              ))}

            {Array.from({ length: Math.max(0, 4 - previews.length) }).map((_, i) => (
                                      <div
                                          key={i}
                                          className="w-full aspect-square flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-sm cursor-pointer"
                                          onClick={handleContainerClick}
                                        >
                                          +
                                      </div>
            ))}
          </div>
            <ErrorMessage message={errors.image?.message ?? ""} />

          <p className="text-sm text-gray-400 mt-2">Up to 4 images (PNG or JPG)</p>
        </div>

        <div className="mt-2 p-5 bg-white rounded">
            <fieldset className="mt-4 flex flex-col gap-2">
                <label htmlFor="content" className="text-sm text-[#02282c]">Description *</label>
                <textarea
                    className="w-2/3 p-4 border border-[#BEBEBE] rounded resize-none max-sm:w-full"
                    {...register("content")}
                    id="content"
                    onChange={(e) => setDescriptionCharacters(e.target.value.length)}
                    placeholder="Think about what details you'd like to see in the ad and add them to the description"
                    rows={7}          
                />
                <div className="w-2/3 flex items-center justify-between text-sm text-[#6f6f6f] max-sm:w-full">
                    <p>Please enter at least 40 characters</p>
                    <p>{descriptionCharacters}/9000</p>
                </div>
                <ErrorMessage message={errors.content?.message ?? ""} />
            </fieldset>
        </div>

        <div className="mt-2 p-5 bg-white rounded">
            <h3 className="button-secondary w-fit px-10 text-base font-semibold">Sell</h3>
            <fieldset className="mt-5 flex flex-col gap-2">
                <label htmlFor="title" className="text-sm text-[#02282c]">Price *</label>
                <div className="w-1/4 flex items-center border border-[#BEBEBE] rounded max-sm:w-1/2">
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
            <Link onClick={() => router.push("/")}
                    href="/" 
                    className="w-fit py-2 px-4 flex items-center gap-2 text-base text-center font-bold border-b cursor-pointer"
            >
                <p>Back</p>
                <Undo2 size={18}/>
            </Link>
            <button className="button-secondary text-base w-35 cursor-pointer">{isPending ? "Pending..." : "Publish"}</button>
        </div>
    </form>
    {error && <ErrorMessage message={error.message}/>}
    </>
  )
}

export default CreatePostForm
'use server'

import { v4 as uuid } from "uuid"
import { createClient } from "@/utils/supabase/server-client"

export const uploadImages = async (images: File[]): Promise<string[]> => {
  const supabase = await createClient()

  const names = images.map(async (file) => {
    const imageName = file.name.split(".")
    const path:string = `${file.name[0]}-${uuid()}.${imageName[1]}`
    const { data, error } = await supabase.storage
                                            .from("post-images")
                                            .upload(path, file)
    if (error) throw error

    const { data: {publicUrl} } = supabase.storage
                                        .from("post-images")
                                        .getPublicUrl(data.path)
    return publicUrl
  })
  
  return await Promise.all(names)
}
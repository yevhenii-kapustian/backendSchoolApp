'use server'

import { v4 as uuid } from "uuid"
import { createClient } from "@/utils/supabase/server-client"

export const uploadImage = async (image: File) => {
  const supabase = await createClient()

  const imageName: string[] = image.name.split(".")
  const path:string = `${imageName[0]}-${uuid()}.${imageName[1]}`

  const { data, error } = await supabase.storage
                                        .from("images")
                                        .upload(path, image)

  if (error) throw error

  const { data: {publicUrl} } = supabase.storage
                                    .from("images")
                                    .getPublicUrl(data.path)

  return publicUrl
}
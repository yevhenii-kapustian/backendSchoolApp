import { createClient } from "./browser-client"
import { type QueryData } from "@supabase/supabase-js";

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
    return await supabase.from("posts")
                        .select('id, title, slug, price, image, created_at, users("username")')
                        .order('created_at', {ascending: false})
}

export const getSinglePost = async (slug: string) => {
    const supabase = createClient()
    return await supabase.from('posts')
                        .select(`
                                id,
                                title, 
                                content, 
                                user_id, 
                                users("username"),
                                slug, 
                                image,
                                price, 
                                categories("id", "name", "slug"),
                                created_at`)
                        .eq('slug', slug)
                        .single()
}

export const getSearchPost = async (searchTerm: string) => {
    const supabase = createClient()
    return await supabase
                .from("posts")
                .select('title, slug')
                .ilike("title", `%${searchTerm}%`)
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>
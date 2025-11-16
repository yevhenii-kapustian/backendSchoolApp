import { createClient } from "./browser-client"
import { type QueryData } from "@supabase/supabase-js";

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
    return await supabase.from("posts")
                        .select('id, title, slug, price, image, created_at, users("username"), categories("name")')
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

export const getCategories = async (supabase: ReturnType<typeof createClient>) => {
    return await supabase.from("categories")
                            .select("*")
                            .order("name", {ascending: true})
}

export const getComments = async (supabase: ReturnType<typeof createClient>, postId: number) => {
    return await supabase.from("comments")
                            .select(`
                                id,
                                content,
                                created_at,
                                parent_id,
                                post_id,
                                user_id,
                                users(username)
                            `)
                            .eq("post_id", postId)
                            .order("created_at", {ascending: true})
}

export const getSingleComment = async (supabase: ReturnType<typeof createClient>, commentId: number) => {
    return await supabase.from("comments")
                            .select(`
                                id,
                                content,
                                created_at,
                                parent_id,
                                post_id,
                                user_id
                            `)
                            .eq("id", commentId)
                            .single()
}

export const getPostsByUser = async ( supabase: ReturnType<typeof createClient>, userId: string ) => {
  return supabase.from("posts").select("*").eq("user_id", userId)
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>
export type GetCategories = QueryData<ReturnType<typeof getCategories>>
export type CommentType = QueryData<ReturnType<typeof getComments>>[number]
export type UserPostsType = QueryData<ReturnType<typeof getPostsByUser>>
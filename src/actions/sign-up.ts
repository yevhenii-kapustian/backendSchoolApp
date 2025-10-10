'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { z } from "zod"
import { signUpSchema } from "./schemas"


export const SignUp = async (userData: z.infer<typeof signUpSchema>) => {
    const parsedData = signUpSchema.parse(userData)

    const supabase = await createClient()
    const {data: {user}, error} = await supabase.auth.signUp(parsedData)
    
    if (user && user.email) {
        const {data, error} = await supabase.from('users').insert([{id: user.id, email: user.email, username: userData.username}])
    }
    
    if (error) throw error

    redirect("/")
}

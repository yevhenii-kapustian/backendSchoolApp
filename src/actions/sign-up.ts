'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { z } from "zod"
import { signUpSchema } from "./schemas"

export const SignUp = async (userData: z.infer<typeof signUpSchema>) => {
    const parsedData = signUpSchema.parse(userData)

    const supabase = await createClient()
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: parsedData.email,
        password: parsedData.password,
        options: {
            data: { username: parsedData.username }
        }
    })

    if (signUpError) throw signUpError
    if (!user || !user.email) throw new Error("User email is missing")

    const { error: insertError } = await supabase.from('users').insert([{
        id: user.id,
        email: user.email,
        username: parsedData.username
    }])
    if (insertError) throw insertError

    redirect("/")
}

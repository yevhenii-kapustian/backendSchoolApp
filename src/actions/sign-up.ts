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
            data: { username: parsedData.username },
            emailRedirectTo: `https://backend-school-app-jcm2.vercel.app/auth/login`
        }}
    )

    if (signUpError) throw signUpError
    if (!user || !user.email) throw new Error("User email is missing")
    if (!user.email_confirmed_at) redirect("/auth/signup/confirmation")
}

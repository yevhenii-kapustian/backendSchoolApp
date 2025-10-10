'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { logInSchema } from "./schemas"
import { z } from "zod"

export const LogIn = async (userData: z.infer<typeof logInSchema>) => {
    const parsedData = logInSchema.parse(userData)

    const supabase = await createClient()
    const {data: {user}, error} = await supabase.auth.signInWithPassword(parsedData)

    if (error) throw error
    redirect("/")
}
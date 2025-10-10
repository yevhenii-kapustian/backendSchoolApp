import { z } from "zod"

export const logInSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(6, "Your password must be a minimum of 6 characters")
})

export const signUpSchema = z.object({
    username: z.string().min(4, "Too small: String expected to contain more than 4 characters"),
    email: z.string().trim().email(),
    password: z.string().min(6, "Your password must be a minimum of 6 characters")
})

export const postSchema = z.object({
    title: z.string().min(3, "Your title must be a minimum of 3 characters").max(70, "Your title must be a maximum of 70 characters"),
    content: z.string().min(5, "Your description must be a minimum of 5 characters").max(400, "Your description must be a maximum of 400 characters"),
    image: z.instanceof(FormData).optional()
})

export const postSchemaImage = postSchema.omit({
        image: true
    }).extend({
        image: z.unknown().transform((value) => {
        return value as FileList
    }).optional()
})
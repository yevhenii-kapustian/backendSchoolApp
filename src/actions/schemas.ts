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
    title: z.string().min(12, "The title is too short. Add more information").max(70, "Your title must be a maximum of 70 characters"),
    content: z.string().min(40, "Your description must be a minimum of 40 characters").max(9000, "Your description must be a maximum of 9000 characters"),
    image: z.instanceof(FormData).optional().or(z.null()),
    price: z.preprocess( (val) => {
                                    if (typeof val === "string" && /^[0-9]+$/.test(val)) {
                                        return parseInt(val, 10)
                                    }
                                        return val
                                    },
            z.number("Please enter a price. Please note that entering unrealistic or arbitrary prices is prohibited")
                .min(1, "Price must be positive")
            ),
    category_id: z.string().uuid("Select a category") 
})

export const postSchemaImage = postSchema.omit({
        image: true
    }).extend({
        image: z.unknown().transform((value) => {
        return value as FileList
    }).optional()
})

export const createCommentSchema = z.object({
    content: z.string()
        .min(1, "Comment cannot be empty")
        .max(2000, "Comment must be a maximum of 2000 characters")
        .trim(),
    post_id: z.number().int().positive(),
    parent_id: z.number().int().positive().optional().nullable()
})

export const updateCommentSchema = z.object({
    id: z.number().int().positive(),
    content: z.string()
        .min(1, "Comment cannot be empty")
        .max(2000, "Comment must be a maximum of 2000 characters")
        .trim()
})

export const deleteCommentSchema = z.object({
    id: z.number().int().positive()
})
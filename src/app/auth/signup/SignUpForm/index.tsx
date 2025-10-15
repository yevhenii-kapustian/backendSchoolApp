'use client'

import { SignUp } from "../../../../actions/sign-up"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const SignUpForm = () => {
    const [toShow, setToShow] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({ resolver: zodResolver(signUpSchema)})

    const {mutate, isPending, error} = useMutation({
        mutationFn: SignUp
    })

    const handleShowPassword = () => {
        setToShow(!toShow)
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(values => mutate(values))}>
              <fieldset className="flex flex-col">
                <label htmlFor="username">Enter your name</label>
                <input className="py-2 px-3 bg-[rgb(242,244,245)] rounded" type="text" {...register("username")} id="username"/>
                {errors.username && <ErrorMessage message={errors.username.message!}/> }
            </fieldset>

            <fieldset className="flex flex-col">
                <label htmlFor="email">Enter your email</label>
                <input className="py-2 px-3 bg-[rgb(242,244,245)] rounded" type="text" {...register("email")} id="email"/>
                {errors.email && <ErrorMessage message={errors.email.message!}/> }
            </fieldset>

             <fieldset className="flex flex-col">
                <label htmlFor="password">Enter your password</label>
                <div className="relative flex items-center bg-[rgb(242,244,245)]">
                    <input className="w-full py-2 px-3 rounded" type={toShow ? "text" : "password"} {...register("password")} id="password"/>
                    <div onClick={handleShowPassword} className="px-3 cursor-pointer"> {toShow ? <EyeOff color="#3B3B3B" size={20} /> : <Eye color="#3B3B3B" size={20}/>} </div>
                </div>
                {errors.password && <ErrorMessage message={errors.password.message!}/> }
            </fieldset>
            <div className="text-sm">
                By creating a profile, you agree to the <span className="font-bold">Terms of Use</span>
            </div>
            <button className="mt-5 button-secondary w-full cursor-pointer">{isPending ? "Sign Up is pending" : "Sign Up"}</button>
            {error && <ErrorMessage message={error.message}/> }
        </form>
    )
}

export default SignUpForm
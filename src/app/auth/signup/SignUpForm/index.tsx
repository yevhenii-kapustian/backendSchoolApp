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
        <>
        <div className="w-full bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#02282C] mb-4 sm:mb-6 text-center">Create Account</h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(values => mutate(values))}>
                <fieldset className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-sm font-medium text-[#02282C]">Enter your name</label>
                    <input className="py-2.5 px-4 bg-[rgb(242,244,245)] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#0C74B0] transition-all" type="text" {...register("username")} id="username"/>
                    {errors.username && <ErrorMessage message={errors.username.message!}/> }
                </fieldset>

                <fieldset className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#02282C]">Enter your email</label>
                    <input className="py-2.5 px-4 bg-[rgb(242,244,245)] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#0C74B0] transition-all" type="text" {...register("email")} id="email"/>
                    {errors.email && <ErrorMessage message={errors.email.message!}/> }
                </fieldset>

                <fieldset className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium text-[#02282C]">Enter your password</label>
                    <div className="relative flex items-center bg-[rgb(242,244,245)] rounded-lg">
                        <input className="w-full py-2.5 px-4 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#0C74B0] transition-all" type={toShow ? "text" : "password"} {...register("password")} id="password"/>
                        <div onClick={handleShowPassword} className="px-3 cursor-pointer"> {toShow ? <EyeOff color="#3B3B3B" size={20} /> : <Eye color="#3B3B3B" size={20}/>} </div>
                    </div>
                    {errors.password && <ErrorMessage message={errors.password.message!}/> }
                </fieldset>

                <div className="text-xs sm:text-sm text-[#6f6f6f] mt-2">
                    By creating a profile, you agree to the <span className="font-bold text-[#02282C]">Terms of Use</span>
                </div>

                <button className="mt-2 button-secondary w-full cursor-pointer py-3 text-base font-semibold">{isPending ? "Creating account..." : "Sign Up"}</button>
            </form>

            {error && <div className="mt-4"><ErrorMessage message={error.message}/></div>}
        </div>
        </>
    )
}

export default SignUpForm
'use client'

import { LogIn } from "../../../../actions/log-in"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const LoginForm = () => {
    const [toShow, setToShow] = useState<boolean>(false)
    
    const {
            register, 
            handleSubmit, 
            formState: {errors}
        } = useForm({ resolver: zodResolver(logInSchema)})

    const {mutate, data, isPending} = useMutation({
        mutationFn: LogIn
    })

    const handleShowPassword = () => {
        setToShow(!toShow)
    }

    return (
        <>
        <div className="w-full bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#02282C] mb-4 sm:mb-6 text-center">Welcome Back</h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(values => mutate(values))}>
                <fieldset className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#02282C]">Email</label>
                    <input className="py-2.5 px-4 bg-[rgb(242,244,245)] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#0C74B0] transition-all" {...register("email")} type="text" id="email"/>
                    {errors.email && <ErrorMessage message={errors.email.message!}/>}
                </fieldset>

                <fieldset className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium text-[#02282C]">Password</label>
                    <div className="relative flex items-center bg-[rgb(242,244,245)] rounded-lg">
                        <input className="w-full py-2.5 px-4 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#0C74B0] transition-all" type={toShow ? "text" : "password"} {...register("password")} id="password"/>
                        <div onClick={handleShowPassword} className="px-3 cursor-pointer"> {toShow ? <EyeOff color="#3B3B3B" size={20} /> : <Eye color="#3B3B3B" size={20}/>} </div>
                    </div>
                    {errors.password && <ErrorMessage message={errors.password.message!}/>}
                </fieldset>

                <button className="mt-4 button-secondary w-full cursor-pointer py-3 text-base font-semibold">{isPending ? "Logging in..." : "Login"}</button>
            </form>

            {data?.error && <div className="mt-4"><ErrorMessage message={data.error}/></div>}
        </div>
        </>
    )
}

export default LoginForm
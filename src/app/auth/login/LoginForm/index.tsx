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

    const {mutate, data, error, isPending} = useMutation({
        mutationFn: LogIn
    })

    const handleShowPassword = () => {
        setToShow(!toShow)
    }

    return (
        <>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(values => mutate(values))}>
            <fieldset className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input className="py-2 px-3 bg-[rgb(242,244,245)] rounded" {...register("email")} type="text" id="email"/>
                {errors.email && <ErrorMessage message={errors.email.message!}/>}
            </fieldset>

             <fieldset className="flex flex-col">
                <label htmlFor="password">Password</label>
                  <div className="relative flex items-center bg-[rgb(242,244,245)]">
                    <input className="w-full py-2 px-3 rounded" type={toShow ? "text" : "password"} {...register("password")} id="password"/>
                    <div onClick={handleShowPassword} className="px-3 cursor-pointer"> {toShow ? <EyeOff color="#3B3B3B" size={20} /> : <Eye color="#3B3B3B" size={20}/>} </div>
                </div>
                {errors.email && <ErrorMessage message={errors.email.message!}/>}
            </fieldset>
            <button className="mt-5 button-secondary w-full cursor-pointer">{isPending ? "Login is pending" : "Login"}</button>
        </form>
        {data?.error && <ErrorMessage message={data.error}/> }
        </>
    )
}

export default LoginForm
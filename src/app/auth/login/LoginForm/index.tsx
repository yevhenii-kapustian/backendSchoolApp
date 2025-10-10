'use client'

import { LogIn } from "../../../../actions/log-in"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"

const LoginForm = () => {
    const {
            register, 
            handleSubmit, 
            formState: {errors}
        } = useForm({ resolver: zodResolver(logInSchema)})

    const {mutate, error, isPending} = useMutation({
        mutationFn: LogIn
    })

    return (
        <>
        <form className="flex flex-col" onSubmit={handleSubmit(values => mutate(values))}>
            <fieldset>
                <label htmlFor="email">Enter your email</label>
                <input className="ml-2 mb-4 px-2" {...register("email")} type="text" id="email" placeholder="Enter your email"/>
                {errors.email && <ErrorMessage message={errors.email.message!}/>}
            </fieldset>

             <fieldset>
                <label htmlFor="password">Enter your password</label>
                <input className="ml-2 mb-4 px-2" {...register("password")} type="password" id="password" placeholder="Enter your password"/>
                {errors.password && <ErrorMessage message={errors.password.message!}/>}
            </fieldset>
            <button className="button-secondary w-1/2 m-auto">{isPending ? "Login is pending" : "Login"}</button>
        </form>
        {error && <ErrorMessage message={error.message}/> }
        </>
    )
}

export default LoginForm
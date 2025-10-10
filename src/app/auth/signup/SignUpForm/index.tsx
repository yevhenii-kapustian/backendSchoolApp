'use client'

import { SignUp } from "../../../../actions/sign-up"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({ resolver: zodResolver(signUpSchema)})

    const {mutate, isPending, error} = useMutation({
        mutationFn: SignUp
    })

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(values => mutate(values))}>
              <fieldset>
                <label htmlFor="username">Enter your name</label>
                <input className="ml-2 mb-4 px-2" type="text" {...register("username")} id="username" placeholder="Enter your name"/>
                {errors.username && <ErrorMessage message={errors.username.message!}/> }
            </fieldset>

            <fieldset>
                <label htmlFor="email">Enter your email</label>
                <input className="ml-2 mb-4 px-2" type="text" {...register("email")} id="email" placeholder="Enter your email"/>
                {errors.email && <ErrorMessage message={errors.email.message!}/> }
            </fieldset>

             <fieldset>
                <label htmlFor="password">Enter your password</label>
                <input className="ml-2 mb-4 px-2" type="password" {...register("password")} id="password" placeholder="Enter your password"/>
                {errors.password && <ErrorMessage message={errors.password.message!}/> }
            </fieldset>
            <button className="button-secondary w-1/2 m-auto">{isPending ? "Sign Up is pending" : "Sign Up"}</button>
            {error && <ErrorMessage message={error.message}/> }
        </form>
    )
}

export default SignUpForm
'use client'

import SignUpForm from "./SignUpForm"
import SignUpRouter from "./SignUpRouter"

const SignUpPage  = () => {
    return(
        <div className="w-full max-w-[400px] sm:max-w-[420px] bg-white rounded-lg shadow-xl p-6 sm:p-8 mx-auto">
            <div className="mb-4 flex justify-between border-b">
                <SignUpRouter />
            </div>
            <SignUpForm />
        </div>
    )
}

export default SignUpPage
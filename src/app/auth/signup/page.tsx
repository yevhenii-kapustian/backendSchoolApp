'use client'

import SignUpForm from "./SignUpForm"
import SignUpRouter from "./SignUpRouter"

const SignUpPage  = () => {
    return(
        <div className="w-[400px] mx-auto p-8 rounded bg-white">
            <div className="mb-3 flex justify-between border-b">
                <SignUpRouter/>
            </div>
            <SignUpForm/>
        </div>
    )
}

export default SignUpPage
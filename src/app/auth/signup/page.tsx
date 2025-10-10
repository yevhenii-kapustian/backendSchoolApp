import Link from "next/link"
import SignUpForm from "./SignUpForm"

const SignUpPage  = () => {
    return(
        <div className="w-[700px] mx-auto p-4 border rounded-xl">
            <h2 className="mb-4 text-3xl font-bold">Sign Up!</h2>
            <SignUpForm/>
            <div className="mt-4">
                Already have an account? Log In <Link className="text-red-500" href="/auth/login">here!</Link>
            </div>
        </div>
    )
}

export default SignUpPage
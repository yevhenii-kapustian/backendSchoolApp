import SignUpForm from "./SignUpForm"

const SignUpPage  = () => {
    return(
        <div className="w-[400px] mx-auto p-8 rounded bg-white">
            <div className="mb-3 flex justify-between border-b">
                <a href="/auth/login" className="w-1/2 p-3 text-center hover:border-b-2">Login</a>
                <a href="/auth/signup" className="w-1/2 p-3 text-center border-b-2 pointer-events-none">Sign Up</a>
            </div>
            <SignUpForm/>
        </div>
    )
}

export default SignUpPage
import LoginForm from "./LoginForm"

const LoginPage  = () => {
    return(
        <div className="w-[400px] mx-auto p-8 rounded bg-white">
            <div className="mb-3 flex justify-between border-b">
                <a href="/auth/login" className="w-1/2 p-3 text-center border-b-2 pointer-events-none">Login</a>
                <a href="/auth/signup" className="w-1/2 p-3 text-center hover:border-b-2">Sign Up</a>
            </div>
            <LoginForm/>
            <div className="mt-5 text-sm text-center">
                By signing in, you agree to our <span className="font-bold">Terms of Use.</span>
            </div>
        </div>
    )
}

export default LoginPage
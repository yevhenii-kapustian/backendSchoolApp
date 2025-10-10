import LoginForm from "./LoginForm"
import Link from "next/link"

const LoginPage  = () => {
    return(
        <div className="w-[700px] mx-auto p-4 border rounded-xl">
            <h2 className="mb-4 text-3xl font-bold">Log In!</h2>
            <LoginForm/>
            <div className="mt-4">
                Don't have an account? Sign Up <Link className="text-red-500" href="/auth/signup">here!</Link>
            </div>
        </div>
    )
}

export default LoginPage
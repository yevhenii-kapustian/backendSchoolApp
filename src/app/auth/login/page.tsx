import LoginForm from "./LoginForm"
import LoginRouter from "./LoginRouter"

const LoginPage  = () => {
    return(
        <div className="w-[400px] mx-auto p-8 rounded bg-white">
            <div className="mb-3 flex justify-between border-b">
                <LoginRouter/>
            </div>
            <LoginForm/>
            <div className="mt-5 text-sm text-center">
                By signing in, you agree to our <span className="font-bold">Terms of Use.</span>
            </div>
        </div>
    )
}

export default LoginPage
import LoginForm from "./LoginForm"
import LoginRouter from "./LoginRouter"

const LoginPage  = () => {
    return(
        <div className="w-full max-w-[400px] sm:max-w-[420px] bg-white rounded-lg shadow-xl p-6 sm:p-8 mx-auto">
            <div className="mb-4 flex justify-between border-b pb-2">
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
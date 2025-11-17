import Link from "next/link"

const AuthSignupConfirmation = () => {
    return(
        <section>
            <div className="w-full bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#02282C] mb-4 sm:mb-6 text-center">Check Your Email</h2>

            <div className="flex flex-col gap-4">
                <p className="text-center">
                    To verify your identity, you will receive an email shortly to activate your account.
                </p>
                <Link href="/auth/login" className="mt-4 button-secondary w-full text-center cursor-pointer py-3 text-base font-semibold">
                    Log In
                </Link>
            </div>
        </div>
        </section>
    )
}

export default AuthSignupConfirmation
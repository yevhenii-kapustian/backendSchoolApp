import Link from "next/link"

const AuthSignupConfirmation = () => {
    return(
        <section>
            <div className="w-full bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#02282C] mb-4 sm:mb-6 text-center">Confirmation</h2>

            <div className="flex flex-col gap-4">
                <p className="bg-[#01bf0b]">We have sent you an email</p>
                <p>Please confirm your email to complete registration and <Link className="font-semibold underline" href="/auth/login">log in</Link></p>
                <button className="mt-4 button-secondary w-full cursor-pointer py-3 text-base font-semibold">

                </button>
            </div>
        </div>
        </section>
    )
}

export default AuthSignupConfirmation
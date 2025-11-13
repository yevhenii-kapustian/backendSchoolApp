import Link from "next/link"

const LoginPrompt = () => {
    return (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm text-center">
                Please{" "}
                <Link href="/auth/login" className="text-[#0C74B0] font-semibold hover:underline">
                    log in
                </Link>{" "}
                to leave a comment
            </p>
        </div>
    )
}

export default LoginPrompt

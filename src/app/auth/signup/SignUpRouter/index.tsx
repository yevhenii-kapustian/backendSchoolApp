'use client'
import Link from "next/link"

const SignUpRouter = () => {
    return(
        <>
        <Link onClick={() => window.location.href = "/auth/login"} href="/auth/login" className="w-1/2 p-3 text-center hover:border-b-2">Login</Link>
        <Link onClick={() => window.location.href = "/auth/signup"} href="/auth/signup" className="w-1/2 p-3 text-center border-b-2 pointer-events-none">Sign Up</Link>
        </>
    )
}

export default SignUpRouter
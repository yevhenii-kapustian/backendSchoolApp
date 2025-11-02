'use client'

import Link from "next/link"

const Logo = () => {
    return <Link onClick={() => window.location.href = "/"} href="/" className="text-3xl text-[#23E5DB] font-bold uppercase">Yev</Link>
}

export default Logo
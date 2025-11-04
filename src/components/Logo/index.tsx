'use client'

import Link from "next/link"

interface LogoProps {
    textColor: string,
    fontSize: string
}

const Logo = ({textColor, fontSize}: LogoProps) => {
    return <Link onClick={() => window.location.href = "/"} href="/" className="font-extrabold uppercase" style={{color: textColor, fontSize: fontSize}}>Yev</Link>
}

export default Logo
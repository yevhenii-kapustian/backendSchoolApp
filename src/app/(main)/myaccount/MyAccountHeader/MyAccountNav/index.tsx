// This single element component is for project architecture only, as I may be improving this project using a different table from supabase

'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const navData = [
    {title: "My Posts", slug: "/myaccount"}
]

const MyAccountNav = () => {
    const pathname = usePathname()

    return(
        <>
        {navData.map((item) => {
            const isActive = pathname === item.slug
            return(
                <Link className={`${isActive && "border-b-2"} pb-5 text-[#393939] font-semibold`} key={item.slug} href={item.slug}>{item.title}</Link>
            )
        })}
        </>
    )
}

export default MyAccountNav
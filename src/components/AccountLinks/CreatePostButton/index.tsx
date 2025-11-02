'use client'

import Link from "next/link"

const CreatePostButton = () => {
    return <Link onClick={() => window.location.href = "/create"} href="/create" className="py-3 px-8 text-[#02282C] font-bold bg-white rounded transition-all duration-200 hover:opacity-80">Create Post</Link>
}

export default CreatePostButton
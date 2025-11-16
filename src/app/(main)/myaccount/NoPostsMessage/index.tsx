import Link from "next/link"

const NoPostMessage = () => {
    return(
        <>
        <p className="text-2xl font-bold capitalize">There are no active posts yet</p>
        <p className="">These ads are visible to everyone.</p>
        <div className="w-fit mt-5 cursor-pointer">
            <Link href="/create" className="w-full py-2 px-5 block text-sm text-white bg-[#02282CFF] rounded font-semibold transition-all hover:opacity-90">Create Post</Link>
        </div>
        </>
    )
}

export default NoPostMessage
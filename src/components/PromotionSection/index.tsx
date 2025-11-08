import Image from "next/image"
import Link from "next/link"

const PromotionSection = () => {
    return(
        <section className="mt-10 flex justify-center items-center gap-15 bg-[#02282c]">
            <Image src="/graph.svg" alt="" width={500} height={500} className="w-35" />
            <div className="text-white">
                <h4 className="opacity-70">Check out all of YEV's amazing offerings</h4>
                <p className="text-xl font-bold">Create, publish, and promote your posts with just a few clicks</p>
            </div>
            <Link href="/create" className="py-3 px-6 text-sm text-[#02282C] font-bold bg-white rounded transition-all duration-200 hover:opacity-80">Create Post</Link>
        </section>
    )
}

export default PromotionSection
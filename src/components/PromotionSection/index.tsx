import Image from "next/image"
import Link from "next/link"

const PromotionSection = () => {
    return(
        <section className="mt-10 py-2 px-4 flex justify-center items-center gap-15 bg-[#02282c] max-lg:flex-col max-lg:gap-5 max-lg:py-10">
            <Image src="/graph.svg" alt="" width={500} height={500} className="w-35 max-lg:w-50" />
            <div className="text-white max-lg:w-80">
                <h4 className="opacity-70 max-lg:text-center">Check out all of YEV's amazing offerings</h4>
                <p className="text-xl font-bold max-lg:text-center">Create, publish, and promote your posts with just a few clicks</p>
            </div>
            <Link href="/create" className="py-3 px-6 text-sm text-[#02282C] font-bold bg-white rounded transition-all duration-200 hover:opacity-80">Create Post</Link>
        </section>
    )
}

export default PromotionSection
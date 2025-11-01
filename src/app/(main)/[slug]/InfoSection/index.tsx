import { Heart } from "lucide-react"

interface InfoSectionProps {
    createdTime: string,
    title: string,
    price: number | null
}

export function InfoSection ({createdTime, title, price}: InfoSectionProps) {
    const date = new Date(createdTime)
    const createdDay = date.getDate()
    const createdMonth = date.toLocaleString('default', { month: 'long' });
    const createdYear = date.getFullYear()

    return(
        <>
            <div className="flex items-center justify-between">
                <p className="text-xs text-[#6f6f6f]">Published {createdMonth} {createdDay}, {createdYear}</p>
                {/* <button className="cursor-pointer"> <Heart /> </button> */}
            </div>
            <h3 className="mt-5 text-xl">{title}</h3>
            <p className="mt-5 text-2xl font-bold">{price} $</p>
            <button className="w-full mt-5 p-2 font-semibold border-2 cursor-pointer transition-all hover:bg-gray-100">Comment</button>
        </>
    )
}
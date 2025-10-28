import { Heart } from "lucide-react"

interface InfoSectionProps {
    createdTime: string,
    title: string,
    price: number | null
}

export function InfoSection ({createdTime, title, price}: InfoSectionProps) {
    return(
        <>
        <div>
            <p>{createdTime}</p>
            <Heart/>
        </div>
        <h3>{title}</h3>
        <p>{price}</p>
        <button>Comment</button>
        </>
    )
}
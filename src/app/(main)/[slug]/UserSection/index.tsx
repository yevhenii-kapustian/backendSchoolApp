import { User } from "lucide-react"

interface UserSectionProps {
    userName: string,
    createdTime: string
}

export function UserSection ({userName, createdTime}: UserSectionProps) {
    const date = new Date(createdTime)
    const createdMonth = date.toLocaleString('default', { month: 'long' });
    const createdYear = date.getFullYear()

    return(
        <>
            <h4 className="text-sm font-bold uppercase">User</h4>
            <div className="mt-3 flex gap-3">
                <User size={50} strokeWidth={2} className="p-3 bg-gray-100 rounded-full"/>
                <div>
                    <p className="text-xl">{userName}</p>  
                    <p className="text-sm text-[#6f6f6f]">on YEV since {createdMonth} {createdYear}</p>  
                </div>
            </div>   
        </>
    )
}
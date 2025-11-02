'use client'

import { SetStateAction, useState } from "react"
import { Search, X } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { getSearchPost } from "@/utils/supabase/queries";
import Link from "next/link";

const SearchInput = () => {
    const [userInput, setUserInput] = useState<string>('')
    const {data} = useQuery({
        queryKey: ['search-results', userInput],
        queryFn: async () => {
            const {data, error} = await getSearchPost(userInput)

            if (error) throw new Error
            return data
        },
        enabled: userInput && userInput.length > 0 ? true : false
    })

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUserInput(e.target.value)
    }

    const hadndleRemove = () => {
        setUserInput("")
    }
    
    return (
        <div className="relative max-w-[940px] mt-5 m-auto">
            <div className="flex items-center gap-1 bg-white rounded">
                <Search size={35} className="pl-3" />
                <input onChange={handleChange} value={userInput} className="w-full py-5 px-3 outline-none" type="text" placeholder="What are you looking for?" />
                {userInput.length > 0 && <X size={35} className="pr-3 cursor-pointer" onClick={hadndleRemove} /> }
            </div>
           {data && 
           <div className="w-full mt-2 py-2 px-4 absolute rounded bg-white shadow-md z-2">
            <p className="mt-2 text-xs text-[#6f6f6f] uppercase">Recommendations</p>
                {data.map(({title, slug}) => (
                   <Link onClick={() => setUserInput("")} key={slug} href={`/${slug}`} className="block mt-1 py-2 px-4 hover:bg-gray-100">
                       {title}
                   </Link>
                ))}
           </div>
           }
        </div>
    )
}

export default SearchInput
'use client'

import { SetStateAction, useState } from "react"
import { Search } from 'lucide-react';
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
    
    return (
        <div className="relative">
            <div className="flex items-center gap-5">
               <Search />
               <input onChange={handleChange} value={userInput} className="p-2 border rounded-xl" type="text" placeholder="Search by post title" />
            </div>
           {data && 
           <div className="mt-5 p-2 absolute border rounded-xl bg-white">
                {data.map(({title, slug}) => (
                   <Link onClick={() => setUserInput("")} key={slug} href={`/${slug}`} className="block p-2 border-b">
                       {title}
                   </Link>
                ))}
           </div>
           }
        </div>
    )
}

export default SearchInput
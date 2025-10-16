import { createClient } from "@/utils/supabase/server-client"
import Link from "next/link"
import LogOut from "./LogOutButton"
import { User, ChevronDown } from "lucide-react"
import { getHomePosts } from "@/utils/supabase/queries"

const AccountLinks = async () => {
    const supabase = await createClient()
    const { data: {user} } = await supabase.auth.getUser()
    const { data: posts } = await getHomePosts(supabase)
    
    return (
    <div className="flex items-center">
      {user ? (
        <>
          <div className="relative group">
            <div className="flex items-center mr-5 gap-2 group-hover:opacity-70 cursor-pointer">
                <User color="white"/>
                <Link href="/myaccount" className="text-white font-bold">
                    {posts?.[0].users.username}
                </Link>
                <ChevronDown color="white" size={20}/>
            </div>

            <ul className="
                absolute left-0 top-full w-40 mt-2
                invisible opacity-0 translate-y-2
                group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-200
                bg-white shadow-md rounded
              "
            >
                <li className="py-2 px-6"><p className="text-[rgb(127,151,153)] font-bold">Your Profile</p></li>
                <span className="w-full h-[1px] block bg-black opacity-30" />
                <li className="py-2 px-6 text-sm hover:bg-[rgb(2,40,44)] hover:text-white">
                    <LogOut />
                </li>
            </ul>
          </div>

          <Link href="/create" className="py-3 px-8 text-[#02282C] font-bold bg-white rounded transition-all duration-200 hover:opacity-80">Create Post</Link>
        </>
      ) : (
        <>
        <div className="relative group">
            <div className="flex items-center mr-5 gap-2 group-hover:opacity-70 cursor-pointer">
                <User color="white"/>
                <Link href="/auth/login" className="text-white font-bold">
                    Your Profile
                </Link>
            </div>
        </div>

        <Link href="/auth/login" className="text-white font-bold">
            Log In
        </Link>
        </>
      )}
    </div>
    )
}

export default AccountLinks
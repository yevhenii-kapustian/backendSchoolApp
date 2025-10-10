import { createClient } from "@/utils/supabase/server-client"
import Link from "next/link"
import LogOut from "./LogOutButton"

const AccountLinks = async () => {
    const supabase = await createClient()
    const {data: {user}, error} = await supabase.auth.getUser()
    
    return (
        <div>
            {
                user ? 
                <>
                <Link href="/create" className="button-tertiary mr-4">Create Post</Link>
                <LogOut/>
                </>
                : <Link href="/auth/login" className="button-secondary">Log In</Link>
            }
        </div>
    )
}

export default AccountLinks
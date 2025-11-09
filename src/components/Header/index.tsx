import Logo from "../Logo"
import AccountLinks from "../AccountLinks"
import BurgerMenu from "../BurgerMenu"
import { createClient } from "@/utils/supabase/server-client"

const Header = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return(
        <header className="sticky top-0 z-50 w-full bg-[#02282C] shadow-md">
            <div className="w-full max-w-[1200px] mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
                <Logo textColor="#23e5db" fontSize="30px"/>
                <div className="hidden lg:flex">
                    <AccountLinks/>
                </div>
                <BurgerMenu user={user} />
            </div>
        </header>
    )
}

export default Header
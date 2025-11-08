import Logo from "../Logo"
import AccountLinks from "../AccountLinks"
import BurgerMenu from "../BurgerMenu"
import { createClient } from "@/utils/supabase/server-client"

const Header = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return(
        <header className="w-full bg-[#02282C]">
            <div className="w-[1200px] m-auto py-4 flex justify-between items-center relative max-[1250px]:w-full max-[1250px]:px-8">
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
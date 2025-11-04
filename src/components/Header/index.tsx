import Logo from "../Logo"
import AccountLinks from "../AccountLinks"

const Header = () => {
    return(
        <header className="py-4 px-8 flex justify-around items-center bg-[#02282C]">
            <Logo textColor="#23e5db" fontSize="30px"/>
            <AccountLinks/>
        </header>
    )
}

export default Header
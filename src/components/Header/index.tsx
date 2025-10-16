import Logo from "../Logo"
import AccountLinks from "../AccountLinks"

const Header = () => {
    return(
        <header className="py-4 px-8 flex justify-between items-center bg-[#02282C]">
            <Logo/>
            <AccountLinks/>
        </header>
    )
}

export default Header
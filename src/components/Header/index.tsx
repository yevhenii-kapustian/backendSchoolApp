import Logo from "../Logo"
import AccountLinks from "../AccountLinks"
import SearchInput from "../Search"
import Navigation from "./Navigation"

const Header = () => {
    return(
        <header className="">
            <div className="p-8 flex justify-between items-center border-b">
                <Logo/>
                <SearchInput/>
                <AccountLinks/>
            </div>
            <Navigation/>
        </header>
    )
}

export default Header
import Logo from "../Logo"
import AccountLinks from "../AccountLinks"
import SearchInput from "../Search"

const Header = () => {
    return(
        <header className="p-8 flex justify-between items-center border-b">
            <Logo/>
            <SearchInput/>
            <AccountLinks/>
        </header>
    )
}

export default Header
import Header from "@/components/Header"
import SearchInput from "@/components/Search"
import Footer from "@/components/Footer"

const MainLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
        <Header/>
        <main className="flex-1">
            <SearchInput/>
            {children}
        </main>
        <Footer/>
        </>
    )
}

export default MainLayout
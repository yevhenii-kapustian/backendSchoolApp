import Header from "@/components/Header"
import SearchInput from "@/components/Search"
import Footer from "@/components/Footer"

const MainLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
        <Header/>
        <SearchInput/>
        <main className="mt-10 flex-1">
            {children}
        </main>
        <Footer/>
        </>
    )
}

export default MainLayout
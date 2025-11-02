import Header from "@/components/Header"
import SearchInput from "@/components/Search"

const MainLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
        <Header/>
        <SearchInput/>
        <main className="mt-5 p-5">
            {children}
        </main>
        </>
    )
}

export default MainLayout
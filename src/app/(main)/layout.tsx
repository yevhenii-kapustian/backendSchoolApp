import Header from "@/components/Header"

const MainLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
        <Header/>
        <main className="mt-5 p-5">
            {children}
        </main>
        </>
    )
}

export default MainLayout
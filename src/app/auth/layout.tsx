import Logo from "@/components/Logo"

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
         <header className="p-8 flex justify-between items-center border-b">
            <Logo/>
        </header>
        {children}
        </>
    )
}

export default AuthLayout
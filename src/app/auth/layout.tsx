import { Circle } from "lucide-react"

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
        <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-r from-[#0C74B0] to-[#0AA2FA] overflow-hidden">
            <div className="z-1">
                {children}
            </div>
            <div className="absolute opacity-50 animate-grow-once"><Circle color="white" size={1500}/></div>
        </div>
        </>
    )
}

export default AuthLayout
import { Circle } from "lucide-react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-gradient-to-r from-[#0C74B0] to-[#0AA2FA] overflow-hidden p-4 sm:p-8">
      <div className="relative z-10 w-full max-w-[420px] sm:max-w-md md:max-w-lg">
        {children}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 animate-grow-once pointer-events-none">
        <div className="hidden lg:block">
          <Circle color="white" size={1500} />
        </div>
        <div className="hidden sm:block lg:hidden">
          <Circle color="white" size={800} />
        </div>
        <div className="block sm:hidden">
          <Circle color="white" size={400} />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

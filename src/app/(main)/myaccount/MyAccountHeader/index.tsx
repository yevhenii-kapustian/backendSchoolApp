import Link from "next/link"
import MyAccountNav from "./MyAccountNav"
import WarningMessage from "../WarningMessage"

const MyAccountHeader = () => {
    return(
        <>
        <div className="w-250 m-auto flex items-center justify-between max-lg:w-full max-lg:px-5">
            <h1 className="text-4xl font-bold text-[#393939]">My Profile</h1>
            <div className="w-fit cursor-pointer">
                <Link href="/" className="w-full py-2 px-5 block text-white  bg-[#02282CFF] rounded font-semibold transition-all hover:opacity-90">Home</Link>
            </div>
        </div>
        <div className="w-250 mt-10 m-auto p-5 bg-[#CEDDFF] rounded text-[#393939] max-lg:w-full">
            <WarningMessage/>
        </div>
        <div className="w-250 mt-7 m-auto max-lg:w-full max-lg:px-5">
            <MyAccountNav/>
        </div>
        </>
    )
}

export default MyAccountHeader
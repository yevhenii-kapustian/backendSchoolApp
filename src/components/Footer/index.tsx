import Logo from "../Logo"
import { Instagram, Linkedin, Github } from "lucide-react"
import Link from "next/link"

const Footer = () => {
    return(
        <footer className="p-10 bg-[rgb(203,247,238)]">
            <div className="w-180 m-auto flex flex-col items-center">
                <Logo textColor="#02282C" fontSize="46px"/>
                <p className="mt-7 text-center text-sm text-[#02282C]">
                    All online classifieds in Sweden on YEV - you'll find what you're looking for here! By clicking the "Create Post" button, you can post an ad on any topic quickly and easily. With YEV, you can buy or sell virtually anything.
                </p>
                
                <div className="mt-7 flex flex-col items-center">
                    <p className="text-sm text-[#02282C]">YEV.se communities on social media:</p>
                    <div className="mt-2 flex gap-5">
                        <Link href="https://www.instagram.com/_ev_ge_niii_/" target="_blank"> <Instagram color="#02282C"/> </Link>
                        <Link href="https://www.linkedin.com/in/yevhenii-kapustian/" target="_blank"> <Linkedin color="#02282C" /> </Link>
                        <Link href="https://github.com/yevhenii-kapustian/" target="_blank"> <Github color="#02282C" /> </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
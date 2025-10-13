import Link from "next/link"
import { House } from "lucide-react"

const Navigation = () => {
    return(
        <nav className="p-3 bg-[rgb(7,47,79)]">
           <Link href="/"> <House color="white" /> </Link> 

        </nav>
    )
}

export default Navigation
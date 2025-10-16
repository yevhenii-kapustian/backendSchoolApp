'use client'

import { LogOut } from "../../../actions/log-out"

const LogOutButton = () => {
    const handleClick = () => {
        LogOut()
    }

    return(
        <button onClick={handleClick} className="w-full text-start cursor-pointer">Log Out</button>
    )
}

export default LogOutButton
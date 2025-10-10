'use client'

import { LogOut } from "../../../actions/log-out"

const LogOutButton = () => {
    const handleClick = () => {
        LogOut()
    }

    return(
        <button onClick={handleClick} className="button-secondary">Log Out</button>
    )
}

export default LogOutButton
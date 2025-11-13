'use client'

import { useState, useEffect } from 'react'
import { Menu, X, User } from 'lucide-react'
import Link from 'next/link'
import { User as UserType } from '@supabase/supabase-js'
import { LogOut } from '@/actions/log-out'

interface BurgerMenuProps {
    user: UserType | null
}

const BurgerMenu = ({ user }: BurgerMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        const newState = !isOpen
        setIsOpen(newState)
        document.body.style.overflow = newState ? "hidden" : "unset"
    }

    const closeMenu = () => {
        setIsOpen(false)
        document.body.style.overflow = "unset"
    }

    return (
        <>
            <button onClick={toggleMenu}
                    className="lg:hidden relative z-[60] p-2 text-white hover:opacity-70 transition-opacity"
                    aria-label="Toggle menu"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <div className={`fixed inset-0 bg-black transition-opacity duration-300 z-[55] lg:hidden
                            ${isOpen
                                ? 'opacity-50'
                                : 'opacity-0 pointer-events-none'
                            }
                `}
                onClick={closeMenu}
            />

            <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#02282C] z-[58] transform transition-transform duration-300 ease-in-out lg:hidden
                                ${isOpen
                                    ? 'translate-x-0'
                                    : 'translate-x-full'
                                }
                `}
            >
                <div className="flex flex-col h-full pt-20 px-6">
                    {user ? (
                        <>
                            <div className="pb-6 border-b border-[#23e5db]/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-[#23e5db]/20 flex items-center justify-center">
                                        <User color="#23e5db" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-base">
                                            {user?.user_metadata?.username ?? 'My Account'}
                                        </p>
                                        <p className="text-[#23e5db] text-xs">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <nav className="flex-1 pt-6 overflow-y-auto">
                                <Link
                                    href="/"
                                    onClick={closeMenu}
                                    className="block py-3 px-4 text-white hover:bg-[#23e5db]/10 rounded transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/myaccount"
                                    onClick={closeMenu}
                                    className="block py-3 px-4 mt-2 text-white hover:bg-[#23e5db]/10 rounded transition-colors"
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create"
                                    onClick={closeMenu}
                                    className="block py-3 px-4 mt-4 text-[#02282C] bg-[#23e5db] hover:opacity-80 rounded font-bold transition-opacity text-center"
                                >
                                    Create Post
                                </Link>
                            </nav>

                            <div className="py-6">
                                <button
                                    onClick={() => LogOut()}
                                    className="w-full py-3 px-4 text-white border border-white/30 hover:bg-white/10 rounded transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#23e5db]/30">
                                <div className="w-12 h-12 rounded-full bg-[#23e5db]/20 flex items-center justify-center">
                                    <User color="#23e5db" size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-base">Guest</p>
                                    <p className="text-[#23e5db] text-xs">Not logged in</p>
                                </div>
                            </div>

                            <nav className="flex flex-col justify-between flex-1 overflow-y-auto">

                                <div>
                                    <Link
                                        href="/"
                                        onClick={closeMenu}
                                        className="block py-3 px-4 text-white hover:bg-[#23e5db]/10 rounded transition-colors"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/auth/login"
                                        onClick={closeMenu}
                                        className="block py-3 px-4 mt-2 text-white hover:bg-[#23e5db]/10 rounded transition-colors"
                                    >
                                        Your Profile
                                    </Link>
                                </div>

                                <Link
                                    href="/auth/login"
                                    onClick={closeMenu}
                                    className="block py-3 px-4 my-4 text-[#02282C] bg-[#23e5db] hover:opacity-80 rounded font-bold transition-opacity text-center"
                                >
                                    Log In
                                </Link>
                            </nav>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default BurgerMenu
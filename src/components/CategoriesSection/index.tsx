'use client'

import { GetCategories } from "@/utils/supabase/queries"
import { useState } from "react"

interface CategoriesSectionProps {
    categories: GetCategories,
    setSelectedCategory: (category: string | null) => void
}

const CategoriesSection = ({categories, setSelectedCategory}: CategoriesSectionProps) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    const handleClick = (name: string | null) => {
        const newCategory = activeCategory === name ? null : name
        setActiveCategory(newCategory)
        setSelectedCategory(newCategory)
        location.href = "#home-posts"
    }

    return (
        <>
        {categories.map(({name}, index: number) => (
            <button
                key={index}
                onClick={() => handleClick(name)}
                className={`
                    min-h-[70px]
                    py-3 px-3 sm:px-4
                    rounded-lg transition-all duration-300 ease-in-out
                    transform hover:scale-103 hover:shadow-lg
                    text-sm
                    ${activeCategory === name
                        ? "text-white bg-[#02282C] shadow-md scale-102"
                        : "text-[#02282C] bg-gray-100 hover:bg-gray-200"
                    }
                    cursor-pointer capitalize
                `}
            >
                {name}
                {activeCategory === name && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#23e5db]/20 to-transparent rounded-lg animate-pulse" />
                )}
            </button>
        ))}
        </>
    )
}

export default CategoriesSection
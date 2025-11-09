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
                    transform hover:scale-105 hover:shadow-lg
                    text-sm
                    ${activeCategory === name
                        ? "text-white bg-gradient-to-br from-[#02282C] to-[#23e5db] shadow-md scale-105"
                        : "text-[#02282C] bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200"
                    }
                    cursor-pointer capitalize border-2
                    ${activeCategory === name ? "border-[#23e5db]" : "border-transparent hover:border-gray-300"}
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
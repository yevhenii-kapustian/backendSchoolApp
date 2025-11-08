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
            <p key={index} 
                onClick={() => handleClick(name)} 
                className={`${activeCategory === name ? "text-white bg-[rgb(2,40,44)]" : "text-black bg-gray-100"} w-full h-[64px] py-2 px-4 flex justify-center items-center text-sm text-center rounded cursor-pointer capitalize`}
            >
                    {name}
            </p>
        ))}
        </>
    )
}

export default CategoriesSection
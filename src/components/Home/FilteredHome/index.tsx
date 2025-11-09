'use client'

import { useState } from "react"
import { GetCategories, HomePostType } from "@/utils/supabase/queries"
import CategoriesSection from "@/components/CategoriesSection"
import HomePosts from "../HomePosts"

interface FilteredHomeProps {
    categories: GetCategories,
    posts: HomePostType
}

const FilteredHome = ({categories, posts}: FilteredHomeProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const filteredPosts = selectedCategory ? posts.filter((post) => post.categories?.name === selectedCategory ) : posts
    return(
        <>
        <section className="py-6 sm:py-10 bg-white shadow-xs">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl sm:text-2xl font-extrabold text-center text-[#393939]">Sections on the YEV service</h2>
                <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
                    <CategoriesSection categories={categories} setSelectedCategory={setSelectedCategory} />
                </div>
            </div>
        </section>
        <HomePosts posts={filteredPosts} />
        </>
    )
}

export default FilteredHome
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
        <section className="py-10 bg-white shadow-xs">
            <div className="w-[1200px] m-auto">
                <h2 className="text-2xl font-extrabold text-center text-[#393939]">Sections on the YEV service</h2>
                <div className="mt-10 w-fit m-auto grid grid-rows-2 grid-cols-6 justify-items-center gap-5">
                    <CategoriesSection categories={categories} setSelectedCategory={setSelectedCategory} />
                </div>
            </div>
        </section>
        <HomePosts posts={filteredPosts} />
        </>
    )
}

export default FilteredHome
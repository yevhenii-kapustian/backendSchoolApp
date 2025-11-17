import FilteredHome from "@/components/Home/FilteredHome";
import { getCategories, getHomePosts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server-client";
import PromotionSection from "@/components/PromotionSection";

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient()
  const { data } = await getHomePosts(supabase)
  const {data: categories} = await getCategories(supabase)
  
  return (
    <>
    {categories && data && <FilteredHome categories={categories} posts={data} /> }
    <PromotionSection />
    </>
  );
}

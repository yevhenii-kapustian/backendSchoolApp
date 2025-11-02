import HomePosts from "@/components/Home/HomePosts";
import { getHomePosts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server-client";

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient()
  const { data } = await getHomePosts(supabase)

  return (
    <>
    {data && <HomePosts posts={data} /> }
    </>
  );
}

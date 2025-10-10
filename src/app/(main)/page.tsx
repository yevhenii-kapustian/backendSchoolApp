import { getHomePosts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server-client";
import Link from "next/link";

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient()
  const { data } = await getHomePosts(supabase)


  return (
    <div>
        <div className="flex flex-col gap-5">
            {data && data.map(({id, slug, title, users}) => 
                <Link href={`/${slug}`} key={id} className="p-4 block border rounded">
                    <p>{title}</p>
                    <p className="text-end">by {users.username}</p>
                </Link> 
            )}
        </div>
    </div>
  );
}

import Link from "next/link"

const EditButton = async ({slug}: {slug:string}) => {
    return(
        <Link href={`/${slug}/edit`} className="w-fit py-2 px-4 flex items-center gap-2 text-base text-center font-bold border-b cursor-pointer">Edit Post</Link>
    )
}

export default EditButton
import Link from "next/link"

const EditButton = async ({slug}: {slug:string}) => {
    return(
        <Link href={`/${slug}/edit`} className="button-secondary">Edit Post</Link>
    )
}

export default EditButton
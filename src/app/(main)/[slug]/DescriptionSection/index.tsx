interface DescriptionSectionProps {
    description: string | null,
    category: string | null
}

export function DescriptionSection ({description, category}: DescriptionSectionProps) {
    return(
        <>
            <p className="w-fit py-1 px-3 border rounded text-sm text-[#6f6f6f]"> {category} </p>
            <div className="mt-5">
                <h3 className="text-2xl font-bold uppercase">Description</h3>
                <p className="mt-3 break-words">{description}</p>
            </div>
        </>
    )
}
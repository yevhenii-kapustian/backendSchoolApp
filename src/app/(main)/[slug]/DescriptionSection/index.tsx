interface DescriptionSectionProps {
    description: string | null,
    category: string | null
}

export function DescriptionSection ({description, category}: DescriptionSectionProps) {
    return(
        <>
        <div>
            {category}
        </div>
        <div>
            <h3 className="uppercase">Description</h3>
            <p>{description}</p>
        </div>
        </>
    )
}
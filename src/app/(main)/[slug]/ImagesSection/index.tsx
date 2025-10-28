'use client'

import { useState } from "react"
import Image from "next/image"

interface ImagesSectionProps {
    index: number,
    images: string[]
}

export function ImagesSection ({index, images}: ImagesSectionProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return(
        <div>
            <Image key={Math.random() * index} src={images[currentIndex]} alt={images[currentIndex]} width={200} height={200} />
            <button onClick={handleNext} disabled={currentIndex === images.length - 1}>next</button>
            <button onClick={handlePrev} disabled={currentIndex === 0}>prev</button>
        </div>
    ) 
}
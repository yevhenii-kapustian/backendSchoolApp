'use client'

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImagesSectionProps {
  images: string[]
}

export function ImagesSection({ images }:ImagesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative flex justify-between items-center gap-5 w-[600px] h-[600px]">
      {images.length > 1 && (
        <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-white/80 p-2 h-fit rounded-full hover:bg-white disabled:opacity-20 disabled:cursor-default shadow cursor-pointer"
        >
          <ChevronLeft />
        </button>
      )}

    <div className="w-full h-full">
      {images.length > 0 && 
          <Image 
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`picture ${currentIndex + 1}`}
            width={2000}
            height={2000}
            className="object-contain w-full h-full transition-transform duration-300 ease-in-out"
          />
      }
    </div>

      {images.length > 1 && (
        <button
          onClick={handleNext}
          disabled={currentIndex === images.length - 1}
          className="bg-white/80 p-2 h-fit rounded-full hover:bg-white disabled:opacity-20 disabled:cursor-default shadow cursor-pointer"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  )
}

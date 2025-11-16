'use client'

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ImagesSection({ images }: {images: string[]}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
      <div className="relative flex items-center justify-center max-w-[600px] w-full h-[600px] bg-white rounded overflow-hidden max-lg:w-full max-lg:h-[600px]">
      {images.length > 1 && (
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            z-10 bg-white/80 p-2 rounded-full 
            hover:bg-white shadow
            disabled:opacity-20 disabled:cursor-default
          "
        >
          <ChevronLeft />
        </button>
      )}

      <div className="w-full h-full">
        {images.length > 0 && (
          <Image
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`picture ${currentIndex + 1}`}
            width={2000}
            height={2000}
            className="
              object-contain w-full h-full
              transition-transform duration-300 ease-in-out
            "
          />
        )}
      </div>

      {images.length > 1 && (
        <button
          onClick={handleNext}
          disabled={currentIndex === images.length - 1}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            z-10 bg-white/80 p-2 rounded-full 
            hover:bg-white shadow
            disabled:opacity-20 disabled:cursor-default
          "
        >
          <ChevronRight />
        </button>
      )}
    </div>
  )
}

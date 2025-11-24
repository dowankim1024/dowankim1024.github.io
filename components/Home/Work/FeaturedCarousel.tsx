'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FeaturedProject {
  href: string
  img: string
  title: string
  description: string
}

interface FeaturedCarouselProps {
  projects: FeaturedProject[]
}

export default function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 자동 슬라이드
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
      }, 8000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, projects.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // 5초 후 다시 자동 재생 시작
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + projects.length) % projects.length)
  }

  const goToNext = () => {
    goToSlide((currentIndex + 1) % projects.length)
  }

  return (
    <div className="relative w-full my-16">
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(${(100 - 85) / 2}% - ${currentIndex * 85}% - ${currentIndex * 3}rem))`,
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative flex-shrink-0"
              style={{
                width: '85%',
                marginRight: '3rem',
              }}
            >
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden group"
              >
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className={`object-cover transition-all duration-500 rounded-2xl ${
                    index === currentIndex 
                      ? 'scale-100 brightness-100' 
                      : 'scale-95 brightness-85'
                  } group-hover:scale-105`}
                  sizes="85vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent rounded-2xl" />
                <div className={`absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-50'
                }`}>
                  <h3 className="text-2xl md:text-4xl font-bold mb-2">{project.title}</h3>
                  <p className="text-lg md:text-xl text-white/90">{project.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 좌우 화살표 버튼 */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/70 text-black p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="이전 프로젝트"
      >
        <i className="fa-solid fa-chevron-left text-xl"></i>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/70 text-black p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="다음 프로젝트"
      >
        <i className="fa-solid fa-chevron-right text-xl"></i>
      </button>

      {/* 인디케이터 */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-[#03e8f9]'
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`프로젝트 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  )
}


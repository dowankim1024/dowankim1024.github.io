'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ArrowUp() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home')
      if (!homeSection) return

      const homeHeight = homeSection.offsetHeight
      if (window.scrollY > homeHeight / 2) {
        setOpacity(1)
      } else {
        setOpacity(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <aside>
      <Link
        className="fixed bottom-12 right-12 z-[1000] text-5xl w-[72px] h-[72px] rounded-full text-center bg-[#050a13] shadow-[0_3px_10px_#03e8f9] transition-opacity duration-300 text-white flex items-center justify-center max-md:text-3xl max-md:w-12 max-md:h-12 max-md:bottom-6 max-md:right-6"
        href="#home"
        title="back to top"
        onClick={scrollToTop}
        style={{ opacity }}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </Link>
    </aside>
  )
}


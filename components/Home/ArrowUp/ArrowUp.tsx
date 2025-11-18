'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './ArrowUp.module.css'

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
        className={styles.arrowUp}
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


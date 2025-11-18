'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'
import { NAV_SECTIONS, NavSection } from './Header.constants'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<NavSection>('home')
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const handleScroll = () => {
      const headerHeight = header.getBoundingClientRect().height
      if (window.scrollY > headerHeight) {
        setIsDark(true)
      } else {
        setIsDark(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds: NavSection[] = [...NAV_SECTIONS]
    const sections = sectionIds.map(id => document.getElementById(id))
    const visibleSections = sectionIds.map(() => false)

    const options = {
      rootMargin: '-20% 0px 0px 0px',
      threshold: [0, 0.98],
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let selectLastOne = false
      entries.forEach((entry) => {
        const targetId = entry.target.id as NavSection
        const index = sectionIds.indexOf(targetId)
        if (index < 0) {
          return
        }
        visibleSections[index] = entry.isIntersecting
        selectLastOne = index === sectionIds.length - 1 && 
          entry.isIntersecting && 
          entry.intersectionRatio >= 0.95
      })

      const findFirstIntersecting = (intersections: boolean[]) => {
        const index = intersections.indexOf(true)
        return index >= 0 ? index : 0
      }

      const navIndex = selectLastOne 
        ? sectionIds.length - 1 
        : findFirstIntersecting(visibleSections)

      setActiveSection(sectionIds[navIndex])
    }

    const observer = new IntersectionObserver(observerCallback, options)
    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header 
      ref={headerRef}
      className={`${styles.header} ${isDark ? styles.dark : ''}`}
    >
      <div className={styles.logo}>
        <Image
          className={styles.logoImg}
          src="/images/projects/prof.jpeg"
          alt="logo"
          width={36}
          height={36}
        />
        <h1 className={styles.logoTitle}>
          <Link 
            href="#" 
            onClick={(e) => { 
              e.preventDefault(); 
              window.scrollTo({ top: 0, behavior: 'smooth' }) 
            }}
          >
            DowanKim
          </Link>
        </h1>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {NAV_SECTIONS.map((section) => (
            <li key={section}>
              <Link
                href={`#${section}`}
                className={`${styles.menuItem} ${
                  activeSection === section ? styles.active : ''
                }`}
                onClick={(e) => scrollToSection(e, section)}
              >
                {section === 'work' ? 'My work' : section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={styles.toggle}
        aria-label="navigation menu toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      {isMenuOpen && (
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileMenu}>
            {NAV_SECTIONS.map((section) => (
              <li key={section}>
                <Link
                  href={`#${section}`}
                  className={`${styles.menuItem} ${
                    activeSection === section ? styles.active : ''
                  }`}
                  onClick={(e) => scrollToSection(e, section)}
                >
                  {section === 'work' ? 'My work' : section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}


'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'
import { NAV_ITEMS } from './Header.constants'

export default function Header() {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
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
          <Link href="/">
            DowanKim
          </Link>
        </h1>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.menuItem} ${
                  isActive(item.href) ? styles.active : ''
                }`}
              >
                {item.label}
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
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.menuItem} ${
                    isActive(item.href) ? styles.active : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

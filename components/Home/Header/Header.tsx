'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
      className={`fixed top-0 w-full p-4 flex justify-between items-center z-10 transition-all duration-300 bg-transparent ${isDark ? 'bg-[#050a13] shadow-[0_2px_4px_rgba(0,0,0,0.1)]' : ''}`}
    >
      <div className="flex items-center gap-2">
        <Image
          className="w-9 h-9 object-cover object-top rounded-full border border-[#03e8f9]"
          src="/images/projects/prof.jpeg"
          alt="logo"
          width={36}
          height={36}
        />
        <h1 className="text-3xl">
          <Link href="/">
            DowanKim
          </Link>
        </h1>
      </div>
      <nav className="hidden md:block">
        <ul className="flex gap-1 mr-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 border-b border-transparent transition-all duration-[250ms] hover:border-[#03e8f9] ${
                  isActive(item.href) ? 'border border-[#03e8f9] rounded' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="block text-white text-2xl absolute top-5 right-4 bg-transparent border-none cursor-pointer md:hidden"
        aria-label="navigation menu toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      {isMenuOpen && (
        <nav className="block absolute top-full left-0 w-full bg-[#050a13] md:hidden">
          <ul className="flex flex-col text-center my-4 mx-16 gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2 border-b border-transparent transition-all duration-[250ms] hover:border-[#03e8f9] ${
                    isActive(item.href) ? 'border border-[#03e8f9] rounded' : ''
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

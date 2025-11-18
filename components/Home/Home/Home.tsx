'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Home.module.css'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const homeHeight = container.offsetHeight
      setOpacity(1 - window.scrollY / homeHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className={styles.section}>
      <div className={styles.container} ref={containerRef} style={{ opacity }}>
        <Image
          className={styles.avatar}
          src="/images/projects/prof.jpeg"
          alt="Dowan Kim's profile"
          width={400}
          height={500}
          style={{ width: 'auto', height: 'auto' }}
        />
        <div className={styles.content}>
          <h2 className={styles.title} aria-label="Designer&Developer Dowan Kim">
            <strong className={styles.titleStrong}>
              Front-end Engineer
            </strong>
            <span>Dowan Kim</span>
          </h2>
          <p className={styles.description}>Front-end developer with design skills</p>
          <ul className={styles.links}>
            <li>
              <Link
                className={styles.link}
                href="https://github.com/dowankim1024"
                target="_blank"
                title="my github link"
              >
                <i className="fa-brands fa-github"></i>
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href="https://blog.naver.com/kimdowan1004"
                target="_blank"
                title="my blog link"
              >
                <i className="fa-solid fa-blog"></i>
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href="https://www.instagram.com/dowan.kim_developer/"
                target="_blank"
                title="my instagram link"
              >
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </li>
          </ul>
          <Link
            className={styles.contact}
            href="#contact"
            onClick={scrollToSection}
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  )
}


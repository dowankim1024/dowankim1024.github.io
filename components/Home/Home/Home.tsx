'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './Home.module.css'
import { socialLinks } from './Home.constants'

export default function Home() {

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className={styles.section}>
      <div className={styles.container}>
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
            {socialLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className={styles.link}
                  href={link.href}
                  target="_blank"
                  title={link.title}
                >
                  <i className={link.iconClass}></i>
                </Link>
              </li>
            ))}
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


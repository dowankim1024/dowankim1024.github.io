'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Work.module.css'
import { categories, projects } from './Work.constants'

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isAnimating, setIsAnimating] = useState(false)

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === selectedCategory) return
    
    setIsAnimating(true)
    setSelectedCategory(categoryId)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 250)
  }

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.type === selectedCategory)

  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>My work</h2>
        <p className={styles.subtitle}>Projects</p>
        <ul className={styles.categories}>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`${styles.category} ${
                  selectedCategory === category.id ? styles.selected : ''
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.label}{' '}
                <span className={styles.count}>{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className={`${styles.projects} ${isAnimating ? styles.animating : ''}`}>
          {filteredProjects.map((project, index) => (
            <li key={index} className={styles.project}>
              <Link
                href={project.href}
                target={project.href === '#' ? '_self' : '_blank'}
                className={styles.projectLink}
              >
                <Image
                  src={project.img}
                  alt={project.title}
                  className={styles.projectImg}
                  width={300}
                  height={300}
                />
                <div className={styles.metadata}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}


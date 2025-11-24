'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
    <section id="work" className="bg-[#050a13] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h2 className="text-4xl my-4">My work</h2>
        <p className="text-2xl my-2">Projects</p>
        <ul className="flex justify-center my-10 gap-4 flex-col md:flex-row md:[&_li]:flex-1 md:[&_li]:max-w-[200px]">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`relative text-white text-lg px-4 py-2 rounded border border-[#03e8f9] cursor-pointer whitespace-nowrap bg-transparent transition-all duration-[250ms] w-full flex justify-center items-center ${
                  selectedCategory === category.id ? 'bg-[#03e8f9] text-[#050a13]' : ''
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.label}{' '}
                <span className={`opacity-0 absolute -top-5 right-4 w-7 h-7 leading-7 rounded-full bg-[#fd6413] text-white transition-all duration-[250ms] ${
                  selectedCategory === category.id ? 'opacity-100 top-0' : ''
                } group-hover:opacity-100 group-hover:top-0`}>{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-[250ms] ${
          isAnimating ? 'opacity-0 scale-[0.96] translate-y-5' : ''
        }`}>
          {filteredProjects.map((project, index) => (
            <li key={index} className="flex justify-center items-center relative rounded-lg overflow-hidden group">
              <Link
                href={project.href}
                target={project.href === '#' ? '_self' : '_blank'}
                className="block"
              >
                <Image
                  src={project.img}
                  alt={project.title}
                  className="w-[300px] h-[200px] max-w-full max-h-full object-cover object-center"
                  width={300}
                  height={300}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 flex flex-col justify-center items-center transition-all duration-[250ms] -translate-y-2.5 group-hover:opacity-80 group-hover:translate-y-0">
                  <h3 className="text-white font-bold mb-2 after:content-[''] after:block after:relative after:left-1/2 after:-translate-x-1/2 after:my-2 after:w-12 after:h-0.5 after:bg-[#03e8f9]">
                    {project.title}
                  </h3>
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


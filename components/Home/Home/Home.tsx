'use client'

import Image from 'next/image'
import Link from 'next/link'
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
    <section id="home" className="relative bg-[#050a13] bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\' %3E%3Cdefs%3E%3ClinearGradient id=\'a\' x1=\'0\' x2=\'0\' y1=\'0\' y2=\'1\' gradientTransform=\'rotate(267,0.5,0.5)\'%3E%3Cstop offset=\'0\' stop-color=\'%23050A13\'/%3E%3Cstop offset=\'1\' stop-color=\'%231B1E26\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id=\'b\' width=\'14\' height=\'14\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle fill=\'%23013A3F\' cx=\'7\' cy=\'7\' r=\'7\'/%3E%3C/pattern%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23a)\'/%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23b)\' fill-opacity=\'0.09\'/%3E%3C/svg%3E')] text-white py-20 pt-28 text-left max-md:text-center">
      <div className="max-w-[1200px] mx-auto flex flex-row items-center gap-24 justify-center max-md:flex-col max-md:items-center">
        <Image
          className="w-auto h-auto max-w-[400px] max-h-[500px] object-contain object-top rounded-2xl border-[3px] border-[#03e8f9] max-md:max-w-[300px] max-md:max-h-[375px]"
          src="/images/projects/prof.jpeg"
          alt="Dowan Kim's profile"
          width={400}
          height={500}
          style={{ width: 'auto', height: 'auto' }}
        />
        <div className="flex flex-col items-start flex-1 max-md:items-center max-md:text-center">
          <h2 className="text-5xl mb-4 flex flex-col items-start max-md:items-center" aria-label="Designer&Developer Dowan Kim">
            <strong className="text-[#03e8f9] mb-2">
              Front-end Engineer
            </strong>
            <span>Dowan Kim</span>
          </h2>
          <p className="text-xl">Front-end developer with design skills</p>
          <ul className="flex justify-center gap-4 py-4 text-3xl list-none my-4 max-md:justify-center">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="transition-colors duration-[250ms] text-white hover:text-[#03e8f9]"
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
            className="inline-block bg-[#03e8f9] my-8 px-4 py-2 font-bold text-[#050a13] rounded transition-all duration-[250ms] hover:bg-transparent hover:text-white hover:outline hover:outline-2 hover:outline-[#03e8f9] max-md:mx-auto"
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


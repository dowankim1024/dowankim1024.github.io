import Link from 'next/link'
import { CONTACT_EMAIL, contactLinks } from './Contact.constants'

export default function Contact() {
  return (
    <footer id="contact" className="relative bg-[#1b1e26] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h2 className="text-4xl my-4">Let&apos;s talk</h2>
        <p className="text-2xl my-2">{CONTACT_EMAIL}</p>
        <ul className="flex justify-center gap-4 p-4 text-3xl list-none">
          {contactLinks.map((link) => (
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
        <p className="mt-4">©Dowan Kim - All rights reserved</p>
      </div>
    </footer>
  )
}


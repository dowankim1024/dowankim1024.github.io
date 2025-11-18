import Link from 'next/link'
import styles from './Contact.module.css'
import { CONTACT_EMAIL, contactLinks } from './Contact.constants'

export default function Contact() {
  return (
    <footer id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Let&apos;s talk</h2>
        <p className={styles.email}>{CONTACT_EMAIL}</p>
        <ul className={styles.links}>
          {contactLinks.map((link) => (
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
        <p className={styles.copyright}>©Dowan Kim - All rights reserved</p>
      </div>
    </footer>
  )
}


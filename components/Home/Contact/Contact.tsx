import Link from 'next/link'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <footer id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Let&apos;s talk</h2>
        <p className={styles.email}>kimdowan1004@naver.com</p>
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
              href="https://www.instagram.com/dowan.kim_art?igsh=dWFrazJlbDZmd29v"
              target="_blank"
              title="my instagram link"
            >
              <i className="fa-brands fa-instagram"></i>
            </Link>
          </li>
        </ul>
        <p className={styles.copyright}>©Dowan Kim - All rights reserved</p>
      </div>
    </footer>
  )
}


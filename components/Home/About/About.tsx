import Image from 'next/image'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>About me</h2>
        <p className={styles.description}>
          디자인 소양을 갖춘 프론트엔드 개발자를 꿈꾸며 한계없는 상상을 구현합니다.
        </p>
        <p className={styles.description}>
          배움에 제한을 두지 않고 모든 지식을 동원해 새로운 가치를 창출합니다.
        </p>
        <ul className={styles.majors}>
          <li className={styles.major}>
            <i className={`fa-solid fa-code ${styles.majorIcon}`}></i>
            <p className={styles.majorTitle}>Front-end</p>
            <p>HTML, CSS, JavaScript, React, Next.js</p>
          </li>
          <li className={styles.major}>
            <i className={`fa-solid fa-pen-nib ${styles.majorIcon}`}></i>
            <p className={styles.majorTitle}>Design</p>
            <p>Interactive Design, Planning</p>
          </li>
        </ul>
        <ul className={styles.jobs}>
          <li className={styles.job}>
            <Image
              className={styles.jobLogo}
              src="/images/jobs/pnu.png"
              alt="pnu logo"
              width={70}
              height={70}
            />
            <div>
              <p className={styles.jobName}>PNU Design&Technology</p>
              <p className={styles.jobPeriod}>2020.03 - 2026.02</p>
            </div>
          </li>
          <li className={styles.job}>
            <Image
              className={styles.jobLogo}
              src="/images/jobs/gy.png"
              alt="gyvers logo"
              width={70}
              height={70}
            />
            <div>
              <p className={styles.jobName}>Gyvers as Software Engineer, Designer</p>
              <p className={styles.jobPeriod}>2023.09 - 2024.06</p>
            </div>
          </li>
          <li className={styles.job}>
            <Image
              className={styles.jobLogo}
              src="/images/jobs/lsit.png"
              alt="lsit logo"
              width={70}
              height={70}
            />
            <div>
              <p className={styles.jobName}>LS Information Technology Co., Ltd. as front-end developer</p>
              <p className={styles.jobPeriod}>2025.01 - 2025.03</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}


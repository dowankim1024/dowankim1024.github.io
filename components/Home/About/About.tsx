import Image from 'next/image'
import styles from './About.module.css'
import { aboutDescriptions, majors, jobs } from './About.constants'

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>About me</h2>
        {aboutDescriptions.map((sentence) => (
          <p key={sentence} className={styles.description}>
            {sentence}
          </p>
        ))}
        <ul className={styles.majors}>
          {majors.map((major) => (
            <li key={major.title} className={styles.major}>
              <i className={`${major.iconClass} ${styles.majorIcon}`}></i>
              <p className={styles.majorTitle}>{major.title}</p>
              <p>{major.description}</p>
            </li>
          ))}
        </ul>
        <ul className={styles.jobs}>
          {jobs.map((job) => (
            <li key={job.name} className={styles.job}>
              <Image
                className={styles.jobLogo}
                src={job.logo}
                alt={job.alt}
                width={70}
                height={70}
              />
              <div>
                <p className={styles.jobName}>{job.name}</p>
                <p className={styles.jobPeriod}>{job.period}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}


import styles from './Career.module.css'
import { experiences, education, awards, certifications } from './Career.constants'

export default function Career() {
  return (
    <section id="career" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Career</h2>
        
        <div className={styles.content}>
          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionTitle}>Experience</h3>
            <ul className={styles.list}>
              {experiences.map((exp, index) => (
                <li key={index} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.company}>{exp.company}</span>
                    <span className={styles.period}>{exp.period}</span>
                  </div>
                  {exp.role && <p className={styles.role}>{exp.role}</p>}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionTitle}>Education</h3>
            <ul className={styles.list}>
              {education.map((edu, index) => (
                <li key={index} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.company}>{edu.school}</span>
                    <span className={styles.period}>{edu.period}</span>
                  </div>
                  {Array.isArray(edu.major) ? (
                    <div className={styles.role}>
                      {edu.major.map((majorItem, majorIndex) => (
                        <div key={majorIndex}>{majorItem}</div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.role}>{edu.major}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionTitle}>Awards</h3>
            <ul className={styles.list}>
              {awards.map((award, index) => (
                <li key={index} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.year}>{award.year}</span>
                    <span className={styles.award}>{award.award}</span>
                  </div>
                  <p className={styles.role}>{award.title}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionTitle}>Certification</h3>
            <ul className={styles.list}>
              {certifications.map((cert, index) => (
                <li key={index} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.company}>{cert.name}</span>
                    <span className={styles.period}>{cert.period}</span>
                  </div>
                  <p className={styles.role}>{cert.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}


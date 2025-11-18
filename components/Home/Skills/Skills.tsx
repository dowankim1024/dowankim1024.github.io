import styles from './Skills.module.css'

export default function Skills() {
  const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 90 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 50 },
  ]

  const designTools = ['Figma', 'Processing', 'Unity', 'Arduino', 'After Effect']
  const planSkills = ['Data analysis', 'Statistics', 'Communication']

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>My Skills</h2>
        <p className={styles.subtitle}>Skills & Attributes</p>
        <p>
          I use UI/UX design tools and various interactive design tools, and as a
          front-end developer with design skills, I shine in team projects.
        </p>
        <p>
          As a planner, I am also confident in data collection, analysis, and creation
          of solution models.
        </p>
        <div className={styles.skillsGrid}>
          <section className={styles.frontend}>
            <h3 className={styles.skillTitle}>Front-end</h3>
            <ul>
              {skills.map((skill) => (
                <li key={skill.name} className={styles.bar}>
                  <div className={styles.barMetadata}>
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className={styles.barBg}>
                    <div 
                      className={styles.barValue}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.design}>
            <h3 className={styles.skillTitle}>Design</h3>
            <ul className={styles.toolList}>
              {designTools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </section>
          <section className={styles.plan}>
            <h3 className={styles.skillTitle}>Plan</h3>
            <ul className={styles.toolList}>
              {planSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}


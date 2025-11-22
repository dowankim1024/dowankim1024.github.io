import Link from 'next/link'
import { getAllTags, getAllProjects } from '@/lib/blog'
import styles from './page.module.css'
import Header from '@/components/Home/Header/Header'

export default async function BlogPage() {
  const tags = await getAllTags()
  const projects = await getAllProjects()
  
  // 프로젝트 정보가 있는 태그와 없는 태그를 구분
  const projectMap = new Map(projects.map(p => [p.tag, p]))
  const projectTags = tags.map(tag => ({
    tag,
    project: projectMap.get(tag) || null,
  }))

  return (
    <>
      <Header />
      <section className={styles.section}>
        <div className={styles.container}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>프로젝트별 개발 과정을 블로그 형식으로 정리하였습니다.<br/>프로젝트 클릭 시 해당 프로젝트의 블로그 글을 확인할 수 있습니다.</p>
        {projectTags.length === 0 ? (
          <p className={styles.empty}>아직 작성된 글이 없습니다.</p>
        ) : (
          <div className={styles.projects}>
            {projectTags.map(({ tag, project }) => (
              <Link 
                key={tag} 
                href={`/blog/${encodeURIComponent(tag)}`}
                className={styles.projectCard}
              >
                <h2 className={styles.projectTitle}>{tag}</h2>
                {project && project.description && (
                  <p className={styles.projectDescription}>
                    {project.description.length > 50 
                      ? `${project.description.substring(0, 50)}...` 
                      : project.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
      </section>
    </>
  )
}


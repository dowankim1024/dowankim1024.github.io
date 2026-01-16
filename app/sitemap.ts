import type { MetadataRoute } from 'next'
import { getAllTags, getPublishedPosts } from '@/lib/blog'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dowankim.site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // 기본 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/daily`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  try {
    // 태그 페이지들 (/blog/[tag])
    const tags = await getAllTags()
    const tagPages: MetadataRoute.Sitemap = tags
      .filter(tag => tag !== '일상') // Daily 태그는 별도 페이지이므로 제외
      .map(tag => ({
        url: `${baseUrl}/blog/${encodeURIComponent(tag)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      }))

    // 블로그 글 페이지들 (/blog/[tag]/[slug])
    const posts = await getPublishedPosts()
    const postPages: MetadataRoute.Sitemap = posts.map(post => {
      const tag = post.tags && post.tags.length > 0 ? post.tags[0] : ''
      const slug = post.slug || post.id || ''
      
      // updatedAt을 Date로 변환
      let updatedAt: Date
      if (post.updatedAt instanceof Date) {
        updatedAt = post.updatedAt
      } else if (post.updatedAt && typeof post.updatedAt === 'object' && 'toDate' in post.updatedAt) {
        updatedAt = (post.updatedAt as { toDate: () => Date }).toDate()
      } else {
        updatedAt = now
      }

      return {
        url: `${baseUrl}/blog/${encodeURIComponent(tag)}/${encodeURIComponent(slug)}`,
        lastModified: updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
      }
    })

    return [...staticPages, ...tagPages, ...postPages]
  } catch (error) {
    console.error('사이트맵 생성 중 오류:', error)
    // 에러 발생 시 기본 페이지만 반환
    return staticPages
  }
}


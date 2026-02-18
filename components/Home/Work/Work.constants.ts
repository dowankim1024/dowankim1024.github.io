export type ProjectType = 'front-end' | 'design' | 'plan'

export interface Project {
  type: ProjectType
  href: string
  img: string
  title: string
  description: string
}

export interface Category {
  id: ProjectType | 'all'
  label: string
  count: number
}

export const projects: Project[] = [
  {
    type: 'front-end',
    href: 'https://dowankim.site/blog/SIMVEX%3A%20%EA%B3%B5%ED%95%99%20%ED%95%99%EC%8A%B5%EC%9A%A9%20%EC%9B%B9%20%EA%B8%B0%EB%B0%98%203D%20%EA%B8%B0%EA%B3%84%20%EB%B6%80%ED%92%88%20%EB%B7%B0%EC%96%B4',
    img: '/images/projects/SIMVEX.webp',
    title: 'SIMVEX: 공학 학습용 웹 기반 3D 기계 부품 뷰어',
    description: '제 4회 블레이버스 MVP 해커톤 대상',
  },
  {
    type: 'front-end',
    href: 'https://dt.pusan.ac.kr/pages/DT_page/DT_016_page/#/about',
    img: '/images/projects/Graduate.webp',
    title: '2025 PNU Design&Technology Graduate Website',
    description: 'Designer(SeEun Park), Developer(DoWan Kim)',
  },
  {
    type: 'front-end',
    href: 'https://to-infinity-2025-design-technology.vercel.app',
    img: '/images/projects/Infinity.webp',
    title: 'INFINITY 2025 DT Graduate Personal Project',
    description: 'INFINITY-Interative Design Artwork using Three.js',
  },
  {
    type: 'front-end',
    href: 'https://flower-text-fill.vercel.app/',
    img: '/images/projects/flowertext.webp',
    title: 'Interactive Guest Book',
    description: 'Designer(SeEun Park), Developer(DoWan Kim)',
  },
  {
    type: 'front-end',
    href: 'https://dowankim.site/blog/%EC%9D%B4%EA%B2%8C%EB%A8%B8%EB%8B%88',
    img: '/images/projects/egemnoey.webp',
    title: 'Egemoney, Economics Quiz App',
    description: 'KaKaoTechCampus PNU 1 Team',
  },
  {
    type: 'front-end',
    href: 'https://cheerful-cascaron-6f7a7d.netlify.app/',
    img: '/images/projects/todo.webp',
    title: 'TODO-LIST',
    description: 'TODO-LIST using React',
  },
  {
    type: 'front-end',
    href: 'https://yotubeclonecoding.netlify.app/',
    img: '/images/projects/yt.webp',
    title: 'Youtube clone coding',
    description: 'Youtube clone coding using React',
  },
  {
    type: 'plan',
    href: 'https://github.com/dowankim1024/A-Pillar_Camera_SW_Project',
    img: '/images/projects/apillar.webp',
    title: 'A-Pillar Camera SW Project',
    description: 'Future mobility apillar camera image processing technology',
  },
  {
    type: 'plan',
    href: 'https://blog.naver.com/kimdowan1004/223597811952',
    img: '/images/projects/data.webp',
    title: "Gap between elderly people's economic activities and regional libraries",
    description: 'Raising issues and presenting a solution model',
  },
  {
    type: 'design',
    href: 'https://www.figma.com/proto/KserzF8hOq4RbinFpkqXHT/tving-redesign?node-id=32-657&t=ddPnwlCjwPlE9oMn-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=9%3A40',
    img: '/images/projects/tving.webp',
    title: 'Tving Redesign',
    description: 'OTT Redesign using Figma',
  },
  {
    type: 'design',
    href: 'https://github.com/dowankim1024/HarmonyOfStructuredUnstructured',
    img: '/images/projects/processing1.webp',
    title: 'Harmony of Structured Unstructured',
    description: 'using Processing(please refer to ppt)',
  },
  {
    type: 'design',
    href: 'https://blog.naver.com/kimdowan1004/223598508608',
    img: '/images/projects/processing2.webp',
    title: 'Illusion',
    description: 'using Processing',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/p/CP7LDbAFwKH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/vodka.webp',
    title: 'Absolute movie',
    description: 'Absolute movie using Maya',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/tv/CUanofkBd9s/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/unity1.webp',
    title: 'VR contents#1',
    description: 'UNITY VR CONTENTS NO.1',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/tv/CU-ORQvp7tw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/unity2.webp',
    title: 'VR contents#2',
    description: 'UNITY VR CONTENTS_The Desert Prince',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/tv/CVno2wcB-EB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/unity3.webp',
    title: 'VR contentes#3',
    description: 'UNITY VR CONTENTS_HOTDOG',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/tv/CWOPxqPFzdk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/unity4.webp',
    title: 'VR contentes#4',
    description: 'UNITY VR CONTENTS_TUMP RALLY',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/tv/CXvg7LHFC9c/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/unity5.webp',
    title: 'VR contentes#5',
    description: 'UNITY VR CONTENTS_Black Lives Matter',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/p/CyJBlporwoo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/poca.webp',
    title: 'POCARI SWEAT',
    description: 'POCARI SWEAT using Blender',
  },
]

export const categories: Category[] = [
  { id: 'front-end', label: 'Front-end', count: 7 },
  { id: 'design', label: 'Design', count: 16 },
  { id: 'plan', label: 'Plan', count: 2 },
]

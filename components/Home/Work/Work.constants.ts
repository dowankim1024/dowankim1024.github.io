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
    href: 'http://egemoney.co.kr/',
    img: '/images/projects/egemnoey.webp',
    title: 'Egemoney, Economics Quiz App',
    description: 'KaKaoTechCampus PNU 1 Team',
  },
  {
    type: 'front-end',
    href: '#',
    img: '/images/projects/pf.webp',
    title: 'Portfolio Site',
    description: "Dowan Kim's Portfolio Site",
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
    href: 'https://www.instagram.com/tv/CVeW3gDBHqb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/Mayapj.webp',
    title: 'Inside movie',
    description: 'Inside movie using Maya',
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
    href: 'https://www.instagram.com/tv/CXvhbHslRyH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/mayaclock.webp',
    title: 'Clock movie',
    description: 'MAYA CLOCK ANIMATION(PLAYBLAST)',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/p/Cx8E8r3Lyzq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/blender.webp',
    title: '3D Poster',
    description: '3D poster using Blender',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/p/Cx8lLs_yr_4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/blender2.webp',
    title: '3D Material',
    description: '3D Material using Blender',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/p/CyJBlporwoo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/poca.webp',
    title: 'POCARI SWEAT',
    description: 'POCARI SWEAT using Blender',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/reel/CyLSwuCR9GN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/ip.webp',
    title: 'IPHONE 3D GRAPHIC',
    description: 'IPHONE 3D GRAPHIC using Blender',
  },
  {
    type: 'design',
    href: 'https://www.instagram.com/reel/CyTKqGHR9cU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    img: '/images/projects/3d.webp',
    title: '3D GRAPHIC',
    description: '3D GRAPHIC using Blender',
  },
]

export const categories: Category[] = [
  { id: 'all', label: 'All', count: 25 },
  { id: 'front-end', label: 'Front-end', count: 7 },
  { id: 'design', label: 'Design', count: 16 },
  { id: 'plan', label: 'Plan', count: 2 },
]

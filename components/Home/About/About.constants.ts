export interface Major {
  iconClass: string
  title: string
  description: string
}

export interface Job {
  logo: string
  alt: string
  name: string
  period: string
}

export const aboutDescriptions = [
  '디자인 소양을 갖춘 프론트엔드 개발자를 꿈꾸며 한계없는 상상을 구현합니다.',
  '배움에 제한을 두지 않고 모든 지식을 동원해 새로운 가치를 창출합니다.',
]

export const majors: Major[] = [
  {
    iconClass: 'fa-solid fa-code',
    title: 'Front-end',
    description: 'HTML, CSS, JavaScript, React, Next.js',
  },
  {
    iconClass: 'fa-solid fa-pen-nib',
    title: 'Design',
    description: 'Interactive Design, Planning',
  },
]

export const jobs: Job[] = [
  {
    logo: '/images/jobs/pnu.png',
    alt: 'pnu logo',
    name: 'PNU Design&Technology',
    period: '2020.03 - 2026.02',
  },
  {
    logo: '/images/jobs/gy.png',
    alt: 'gyvers logo',
    name: 'Gyvers as Software Engineer, Designer',
    period: '2023.09 - 2024.06',
  },
  {
    logo: '/images/jobs/lsit.png',
    alt: 'lsit logo',
    name: 'LS Information Technology Co., Ltd. as front-end developer',
    period: '2025.01 - 2025.03',
  },
]

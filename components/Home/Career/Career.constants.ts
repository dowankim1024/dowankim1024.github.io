export interface Experience {
  company: string
  role: string
  period: string
}

export interface Education {
  school: string
  major: string | string[]
  period: string
}

export interface Award {
  year: string
  title: string
  award: string
}

export interface Certification {
  name: string
  description: string
  period: string
}

export const experiences: Experience[] = [
  {
    company: '(주)가이버스',
    role: '프론트엔드개발/기획/디자인',
    period: '2023.10 ~ 2024.06',
  },
  {
    company: '(주)바로아이티',
    role: '프론트엔드개발',
    period: '2025.01 ~ 2025.02',
  },
  {
    company: 'GKL(그랜드코리아레저) 펼쳐드림',
    role: '풀잎지역아동센터 교육봉사',
    period: '2024.10 ~ 2024.12',
  },
]

export const education: Education[] = [
  {
    school: '부산대학교',
    major: [
      '전공 : 디자인앤테크놀로지전공',
      '부전공 : 정보컴퓨터공학부',
      '융합트랙 : S/W 융합트랙',
    ],
    period: '2020.03 ~ 2026.02',
  },
  {
    school: '카카오테크캠퍼스 3기',
    major: '프론트엔드',
    period: '2025.04 ~ 2025.11',
  },
]

export const awards: Award[] = [
  {
    year: '2026',
    title: '제 4회 Blaybus MVP 개발 해커톤',
    award: '대상',
  },
  {
    year: '2025',
    title: '카카오테크캠퍼스 아이디어톤',
    award: '우수상',
  },
  {
    year: '2025',
    title: 'PNU S/W 해커톤',
    award: '우수상',
  },
  {
    year: '2024',
    title: 'ARTECH Future Mobility Capstone Design',
    award: '장려상',
  },
]

export const certifications: Certification[] = [
  {
    name: 'ADsP',
    description: '데이터분석준전문가',
    period: '2024.11',
  },
]


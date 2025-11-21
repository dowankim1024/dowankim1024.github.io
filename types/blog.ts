import { Timestamp } from 'firebase/firestore'

export interface BlogPost {
  id?: string
  title: string
  content: string // 마크다운 텍스트
  images: string[] // Storage URL 배열
  createdAt: Timestamp | Date
  updatedAt: Timestamp | Date
  author: string // 사용자 UID
  tags?: string[]
  published: boolean
  slug?: string // URL 친화적인 제목
}

export interface BlogPostFormData {
  title: string
  content: string
  images: File[]
  tags: string[]
  published: boolean
}

export interface Project {
  id?: string
  tag: string // 태그 이름 (프로젝트 이름)
  description: string // 프로젝트 소개글
  createdAt: Timestamp | Date
  updatedAt: Timestamp | Date
}


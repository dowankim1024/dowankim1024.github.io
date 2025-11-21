# Dowan Kim Portfolio & Blog

개인 포트폴리오 웹사이트와 프로젝트별 트러블슈팅 블로그를 통합한 Next.js 기반 웹 애플리케이션입니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [환경 변수 설정](#환경-변수-설정)
- [Firebase 설정](#firebase-설정)
- [배포 방법](#배포-방법)
- [주요 기능 상세 설명](#주요-기능-상세-설명)
- [코드 구조 설명](#코드-구조-설명)
- [API 및 데이터 구조](#api-및-데이터-구조)
- [보안 규칙](#보안-규칙)
- [트러블슈팅](#트러블슈팅)

## 🎯 프로젝트 개요

이 프로젝트는 프론트엔드 개발자 Dowan Kim의 개인 포트폴리오 웹사이트와 프로젝트별 트러블슈팅 블로그를 통합한 웹 애플리케이션입니다. 

### 주요 특징

- **포트폴리오 섹션**: 개인 소개, 경력, 프로젝트 포트폴리오를 한눈에 볼 수 있는 랜딩 페이지
- **프로젝트별 블로그**: 각 프로젝트(태그)별로 트러블슈팅 로그를 작성하고 관리할 수 있는 블로그 시스템
- **관리자 기능**: Firebase Authentication을 통한 인증된 관리자만 글 작성/수정/삭제 가능
- **마크다운 지원**: 블로그 글 작성 시 마크다운 에디터와 이미지 업로드 기능 제공
- **정적 사이트 생성**: Next.js의 Static Export 기능을 활용하여 GitHub Pages에 배포

## 🛠 기술 스택

### Frontend
- **Next.js 14.2.0** - React 기반 프레임워크 (App Router 사용)
- **React 18.3.0** - UI 라이브러리
- **TypeScript 5.3.3** - 타입 안정성
- **Tailwind CSS 3.4.1** - 유틸리티 기반 CSS 프레임워크
- **CSS Modules** - 컴포넌트 스코프 스타일링

### Backend & Database
- **Firebase Firestore** - NoSQL 데이터베이스 (블로그 포스트 및 프로젝트 정보 저장)
- **Firebase Storage** - 이미지 파일 저장
- **Firebase Authentication** - 사용자 인증

### 라이브러리
- **react-markdown** - 마크다운 렌더링
- **@uiw/react-md-editor** - 마크다운 에디터
- **remark-gfm** - GitHub Flavored Markdown 지원
- **rehype-raw** - HTML 태그 렌더링 지원
- **react-syntax-highlighter** - 코드 하이라이팅

### 배포
- **GitHub Pages** - 정적 사이트 호스팅
- **GitHub Actions** - CI/CD 파이프라인

## ✨ 주요 기능

### 1. 포트폴리오 섹션
- **Home**: 프로필 이미지, 소개, 소셜 미디어 링크
- **About**: 자기소개, 전공 분야, 직업 경험
- **Career**: 경력, 학력, 수상 내역, 자격증
- **Work**: 프로젝트 포트폴리오 (카테고리별 필터링)
- **Contact**: 연락처 및 소셜 미디어 링크

### 2. 블로그 시스템
- **프로젝트 목록**: 태그별로 그룹화된 프로젝트 목록 표시
- **프로젝트 페이지**: 각 프로젝트의 소개글과 해당 프로젝트의 블로그 글 목록
- **블로그 글 상세**: 마크다운으로 작성된 블로그 글 상세 보기
- **한글 URL 지원**: 한글 제목을 URL-safe하게 변환하여 사용

### 3. 관리자 기능
- **로그인/로그아웃**: Firebase Authentication을 통한 인증
- **글 작성**: 마크다운 에디터와 이미지 업로드 기능
- **글 수정/삭제**: 기존 글 수정 및 삭제
- **프로젝트 관리**: 각 프로젝트(태그)별 소개글 작성 및 수정
- **클립보드 이미지 붙여넣기**: 스크린샷 복사 후 에디터에 붙여넣기로 자동 업로드

## 📁 프로젝트 구조

```
dowankim1024.github.io/
├── app/                          # Next.js App Router
│   ├── admin/                    # 관리자 페이지
│   │   ├── blog/
│   │   │   ├── edit/[id]/        # 글 수정 페이지
│   │   │   ├── projects/         # 프로젝트 관리 페이지
│   │   │   ├── write/            # 글 작성 페이지
│   │   │   └── page.tsx          # 블로그 관리 대시보드
│   │   └── login/                # 로그인 페이지
│   ├── blog/                     # 블로그 페이지
│   │   ├── [tag]/                # 프로젝트별 페이지
│   │   │   ├── [slug]/           # 개별 글 상세 페이지
│   │   │   └── page.tsx          # 프로젝트 페이지
│   │   └── page.tsx              # 프로젝트 목록 페이지
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 포트폴리오 페이지
├── components/                    # React 컴포넌트
│   ├── AuthGuard/                # 인증 가드 컴포넌트
│   └── Home/                     # 포트폴리오 섹션 컴포넌트
│       ├── About/                # About 섹션
│       ├── ArrowUp/              # 스크롤 업 버튼
│       ├── Career/               # Career 섹션
│       ├── Contact/              # Contact 섹션
│       ├── Header/               # 헤더 네비게이션
│       ├── Home/                 # Home 섹션
│       └── Work/                 # Work 섹션
├── lib/                          # 유틸리티 및 API 함수
│   ├── auth.ts                   # Firebase Authentication 유틸리티
│   ├── blog.ts                   # 블로그 관련 Firestore 함수
│   └── firebase.ts               # Firebase 초기화
├── types/                        # TypeScript 타입 정의
│   └── blog.ts                   # 블로그 관련 타입
├── public/                       # 정적 파일
│   └── images/                   # 이미지 파일
├── .github/workflows/            # GitHub Actions 워크플로우
│   └── deploy.yml                # 배포 자동화 스크립트
├── next.config.js                # Next.js 설정
├── tailwind.config.js            # Tailwind CSS 설정
├── tsconfig.json                 # TypeScript 설정
└── package.json                  # 프로젝트 의존성
```

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js 20.x 이상
- npm 또는 yarn
- Firebase 프로젝트 (Firestore, Storage, Authentication 활성화)

### 설치

```bash
# 저장소 클론
git clone https://github.com/dowankim1024/dowankim1024.github.io.git

# 프로젝트 디렉토리로 이동
cd dowankim1024.github.io

# 의존성 설치
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 Firebase 설정 정보를 입력합니다:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 정적 파일은 `out/` 디렉토리에 생성됩니다.

## 🔧 Firebase 설정

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. 새 프로젝트 생성
3. 웹 앱 추가 (Firebase SDK 설정 정보 복사)

### 2. Firestore Database 설정

1. Firestore Database 생성
2. 보안 규칙 설정 (아래 [보안 규칙](#보안-규칙) 섹션 참조)
3. 인덱스 생성:
   - `posts` 컬렉션: `published` (오름차순), `createdAt` (내림차순) 복합 인덱스

### 3. Storage 설정

1. Storage 활성화
2. 보안 규칙 설정 (아래 [보안 규칙](#보안-규칙) 섹션 참조)

### 4. Authentication 설정

1. Authentication 활성화
2. 이메일/비밀번호 로그인 방법 활성화
3. 관리자 계정 생성

## 📦 배포 방법

### GitHub Pages 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 배포됩니다.

#### 1. GitHub 저장소 설정

1. GitHub 저장소 생성
2. Settings → Pages → Source를 "GitHub Actions"로 설정

#### 2. 자동 배포

`main` 브랜치에 푸시하면 자동으로 빌드 및 배포가 진행됩니다.

워크플로우 파일: `.github/workflows/deploy.yml`

```yaml
name: Deploy Next.js to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Build site
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 📖 주요 기능 상세 설명

### 1. 포트폴리오 섹션

#### Home 컴포넌트 (`components/Home/Home/Home.tsx`)

메인 랜딩 섹션으로, 프로필 이미지와 소개 텍스트를 표시합니다.

**주요 기능:**
- 스크롤 시 투명도 조절 애니메이션
- 소셜 미디어 링크 (GitHub, Blog, Instagram)
- Contact 섹션으로 스크롤 이동

**코드 구조:**
```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Home.module.css'
import { socialLinks } from './Home.constants'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(1)

  // 스크롤 이벤트 리스너로 투명도 조절
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const homeHeight = container.offsetHeight
      setOpacity(1 - window.scrollY / homeHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Contact 섹션으로 스크롤 이동
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className={styles.section}>
      <div className={styles.container} ref={containerRef} style={{ opacity }}>
        {/* 프로필 이미지 */}
        <Image
          className={styles.avatar}
          src="/images/projects/prof.jpeg"
          alt="Dowan Kim's profile"
          width={400}
          height={500}
          style={{ width: 'auto', height: 'auto' }}
        />
        {/* 소개 텍스트 및 링크 */}
        <div className={styles.content}>
          {/* ... */}
        </div>
      </div>
    </section>
  )
}
```

#### Career 컴포넌트 (`components/Home/Career/Career.tsx`)

경력, 학력, 수상 내역, 자격증을 카드 형태로 표시합니다.

**데이터 구조:**
```typescript
// Career.constants.ts
export interface Experience {
  company: string
  role: string
  period: string
}

export interface Education {
  school: string
  major: string | string[]  // 단일 또는 다중 전공
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
```

### 2. 블로그 시스템

#### 프로젝트 목록 페이지 (`app/blog/page.tsx`)

모든 프로젝트(태그)를 카드 형태로 표시합니다.

**주요 로직:**
```typescript
export default async function BlogPage() {
  // 모든 태그와 프로젝트 정보 가져오기
  const tags = await getAllTags()
  const projects = await getAllProjects()
  
  // 태그와 프로젝트 정보 매핑
  const projectMap = new Map(projects.map(p => [p.tag, p]))
  const projectTags = tags.map(tag => ({
    tag,
    project: projectMap.get(tag) || null,
  }))

  return (
    <section className={styles.section}>
      {/* 프로젝트 카드 렌더링 */}
      {projectTags.map(({ tag, project }) => (
        <Link href={`/blog/${encodeURIComponent(tag)}`}>
          {/* ... */}
        </Link>
      ))}
    </section>
  )
}
```

#### 프로젝트 페이지 (`app/blog/[tag]/page.tsx`)

특정 프로젝트의 소개글과 해당 프로젝트의 블로그 글 목록을 표시합니다.

**주요 기능:**
- 프로젝트 소개글 (마크다운 지원)
- 해당 태그의 블로그 글 목록
- 정적 사이트 생성을 위한 `generateStaticParams()` 구현

**코드 구조:**
```typescript
// 정적 사이트 생성을 위한 경로 생성
export async function generateStaticParams() {
  try {
    const tags = await getAllTags()
    return tags.map((tag) => ({
      tag: encodeURIComponent(tag),
    }))
  } catch (error) {
    console.error('Failed to generate static params for tag page:', error)
    return []
  }
}

export default async function TagPage({ params }: PageProps) {
  const decodedTag = decodeURIComponent(params.tag)
  const project = await getProjectByTag(decodedTag)
  const posts = await getPostsByTag(decodedTag)

  return (
    <section className={styles.section}>
      {/* 프로젝트 소개글 */}
      {project && project.description && (
        <div className={styles.description}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.description}
          </ReactMarkdown>
        </div>
      )}
      {/* 블로그 글 목록 */}
      <div className={styles.posts}>
        {posts.map((post) => (
          <Link href={`/blog/${encodeURIComponent(decodedTag)}/${encodeURIComponent(post.slug || post.id || '')}`}>
            {/* ... */}
          </Link>
        ))}
      </div>
    </section>
  )
}
```

#### 블로그 글 상세 페이지 (`app/blog/[tag]/[slug]/page.tsx`)

개별 블로그 글을 마크다운으로 렌더링합니다.

**주요 기능:**
- 마크다운 렌더링 (GitHub Flavored Markdown 지원)
- 코드 하이라이팅
- HTML 태그 지원

### 3. 관리자 기능

#### 글 작성 페이지 (`app/admin/blog/write/page.tsx`)

**주요 기능:**
- 마크다운 에디터 (`@uiw/react-md-editor`)
- 이미지 업로드 (Firebase Storage)
- 클립보드 이미지 붙여넣기
- 태그 입력 (쉼표로 구분)
- 공개/비공개 설정

**클립보드 이미지 붙여넣기 구현:**
```typescript
useEffect(() => {
  const handlePaste = async (e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault()
        const file = item.getAsFile()
        if (!file) continue

        setUploadingImage(true)
        try {
          const user = await getCurrentUser()
          if (!user) {
            alert('로그인이 필요합니다.')
            return
          }

          // 이미지 업로드
          const tempId = `temp_${Date.now()}`
          const imageUrl = await uploadImage(file, tempId)
          
          // 마크다운 형식으로 삽입 (커서 위치에)
          const imageMarkdown = `\n![${file.name}](${imageUrl})\n`
          
          // MDEditor 내부의 textarea에서 커서 위치 가져오기
          let cursorPos = content.length
          if (editorRef.current) {
            const textarea = editorRef.current.querySelector('textarea') as HTMLTextAreaElement
            if (textarea) {
              cursorPos = textarea.selectionStart || content.length
            }
          }
          
          const newContent = content.slice(0, cursorPos) + imageMarkdown + content.slice(cursorPos)
          setContent(newContent)
          
          // 커서 위치 업데이트
          setTimeout(() => {
            if (editorRef.current) {
              const textarea = editorRef.current.querySelector('textarea') as HTMLTextAreaElement
              if (textarea) {
                const newCursorPos = cursorPos + imageMarkdown.length
                textarea.setSelectionRange(newCursorPos, newCursorPos)
                textarea.focus()
              }
            }
          }, 0)
        } catch (err) {
          console.error('이미지 업로드 실패:', err)
          alert('이미지 업로드에 실패했습니다.')
        } finally {
          setUploadingImage(false)
        }
      }
    }
  }

  const editorElement = editorRef.current
  if (editorElement) {
    editorElement.addEventListener('paste', handlePaste)
    return () => {
      editorElement.removeEventListener('paste', handlePaste)
    }
  }
}, [content, images])
```

**Slug 생성 로직:**
```typescript
const generateSlug = (text: string): string => {
  // 한글을 포함한 모든 문자를 URL-safe하게 변환
  let slug = text
    .trim()
    .replace(/\s+/g, '-')      // 공백을 하이픈으로
    .replace(/-+/g, '-')       // 연속된 하이픈을 하나로
    .replace(/^-|-$/g, '')    // 앞뒤 하이픈 제거
  
  // 빈 문자열이면 타임스탬프 사용
  if (!slug) {
    slug = `post-${Date.now()}`
  }
  
  // 한글은 그대로 유지 (Next.js가 자동으로 URL 인코딩 처리)
  return slug
}
```

#### 프로젝트 관리 페이지 (`app/admin/blog/projects/page.tsx`)

각 프로젝트(태그)별 소개글을 작성하고 수정할 수 있습니다.

**주요 기능:**
- 프로젝트 목록 표시
- 소개글 추가/수정
- 마크다운 지원

## 💻 코드 구조 설명

### 1. 컴포넌트 구조

각 컴포넌트는 다음과 같은 구조로 구성됩니다:

```
ComponentName/
├── ComponentName.tsx          # 메인 컴포넌트
├── ComponentName.module.css   # 스타일 (CSS Modules)
├── ComponentName.constants.ts # 상수 데이터
└── index.ts                   # Export 파일
```

**예시: Home 컴포넌트**
```typescript
// components/Home/Home/Home.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Home.module.css'
import { socialLinks } from './Home.constants'

export default function Home() {
  // 컴포넌트 로직
}

// components/Home/Home/Home.constants.ts
export const socialLinks = [
  {
    href: 'https://github.com/dowankim1024',
    iconClass: 'fa-brands fa-github',
    title: 'my github link',
  },
  // ...
]

// components/Home/Home/index.ts
export { default } from './Home'
```

### 2. 라이브러리 함수 구조

#### Firebase 초기화 (`lib/firebase.ts`)

```typescript
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Firebase 초기화 (이미 초기화되어 있으면 재초기화 방지)
let app: FirebaseApp
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)
```

#### 블로그 관련 함수 (`lib/blog.ts`)

**주요 함수:**

1. **`getPublishedPosts()`**: 공개된 포스트만 가져오기
2. **`getAllPosts()`**: 모든 포스트 가져오기 (관리자용)
3. **`getPostBySlug()`**: Slug로 포스트 가져오기
4. **`getPostsByTag()`**: 특정 태그의 포스트 가져오기
5. **`createPost()`**: 포스트 생성
6. **`updatePost()`**: 포스트 업데이트
7. **`deletePost()`**: 포스트 삭제
8. **`uploadImage()`**: 이미지 업로드
9. **`getAllProjects()`**: 모든 프로젝트 가져오기
10. **`getProjectByTag()`**: 특정 태그의 프로젝트 가져오기
11. **`upsertProject()`**: 프로젝트 생성 또는 업데이트
12. **`getAllTags()`**: 모든 태그 목록 가져오기

**예시: 포스트 생성 함수**
```typescript
export const createPost = async (
  postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const now = Timestamp.now()
  const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
    ...postData,
    createdAt: now,
    updatedAt: now,
  })
  return docRef.id
}
```

#### 인증 관련 함수 (`lib/auth.ts`)

```typescript
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './firebase'

// 로그인
export const login = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

// 로그아웃
export const logout = async (): Promise<void> => {
  await signOut(auth)
}

// 현재 사용자 가져오기
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}
```

### 3. 타입 정의 (`types/blog.ts`)

```typescript
import { Timestamp } from 'firebase/firestore'

export interface BlogPost {
  id?: string
  title: string
  content: string              // 마크다운 텍스트
  images: string[]             // Storage URL 배열
  createdAt: Timestamp | Date
  updatedAt: Timestamp | Date
  author: string               // 사용자 UID
  tags?: string[]
  published: boolean
  slug?: string                // URL 친화적인 제목
}

export interface Project {
  id?: string
  tag: string                  // 태그 이름 (프로젝트 이름)
  description: string          // 프로젝트 소개글
  createdAt: Timestamp | Date
  updatedAt: Timestamp | Date
}
```

## 🔐 보안 규칙

### Firestore 보안 규칙

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // posts 컬렉션 규칙
    match /posts/{postId} {
      // 공개된 포스트는 모든 사용자가 읽기 가능
      allow read: if resource.data.published == true;
      // 인증된 사용자는 모든 포스트 읽기 가능 (어드민용)
      allow read: if request.auth != null;
      // 인증된 사용자만 쓰기 가능
      allow write: if request.auth != null;
    }
    
    // projects 컬렉션 규칙
    match /projects/{projectId} {
      // 모든 사용자가 읽기 가능
      allow read: if true;
      // 인증된 사용자만 쓰기 가능
      allow write: if request.auth != null;
    }
  }
}
```

### Storage 보안 규칙

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // blog-images 경로의 이미지
    match /blog-images/{allPaths=**} {
      // 모든 사용자가 읽기 가능
      allow read: if true;
      // 인증된 사용자만 쓰기 가능
      allow write: if request.auth != null;
    }
  }
}
```

## 🐛 트러블슈팅

### 1. 정적 사이트 생성 시 동적 라우트 문제

**문제**: `output: 'export'` 설정에서 동적 라우트(`[slug]`, `[tag]`)를 사용할 때 `generateStaticParams()` 함수가 필요합니다.

**해결**: 각 동적 라우트 페이지에 `generateStaticParams()` 함수를 추가하여 빌드 시점에 모든 경로를 생성합니다.

```typescript
export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts()
    return posts.map((post) => ({
      tag: encodeURIComponent(post.tags[0] || ''),
      slug: encodeURIComponent(post.slug || post.id || ''),
    }))
  } catch (error) {
    return []
  }
}
```

### 2. 한글 URL 인코딩 문제

**문제**: 한글 제목을 slug로 변환할 때 URL 인코딩이 제대로 되지 않습니다.

**해결**: `generateStaticParams()`에서 `encodeURIComponent()`를 사용하고, `getPostBySlug()`에서 `decodeURIComponent()`를 사용합니다.

```typescript
// Slug 생성
const generateSlug = (text: string): string => {
  let slug = text
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return slug || `post-${Date.now()}`
}

// Slug로 포스트 가져오기
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const decodedSlug = decodeURIComponent(slug)
  // ...
}
```

### 3. 클라이언트 컴포넌트에서 서버 함수 사용 불가

**문제**: `'use client'`가 있는 컴포넌트에서는 `generateStaticParams()`를 export할 수 없습니다.

**해결**: 페이지를 서버 컴포넌트로 만들고, 클라이언트 로직은 별도 컴포넌트로 분리합니다.

```typescript
// page.tsx (서버 컴포넌트)
import EditPostClient from './EditPostClient'

export async function generateStaticParams() {
  // ...
}

export default function EditPostPage({ params }: PageProps) {
  return <EditPostClient postId={params.id} />
}

// EditPostClient.tsx (클라이언트 컴포넌트)
'use client'
export default function EditPostClient({ postId }: { postId: string }) {
  // 클라이언트 로직
}
```

### 4. Firebase 권한 에러

**문제**: Firestore나 Storage에 접근할 때 권한 에러가 발생합니다.

**해결**: 
1. Firebase 콘솔에서 보안 규칙을 올바르게 설정
2. 에러 처리를 추가하여 앱이 크래시하지 않도록 함

```typescript
export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    // ...
  } catch (error) {
    console.error('포스트 가져오기 실패:', error)
    return []
  }
}
```

## 📝 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.

## 👤 작성자

**Dowan Kim**
- GitHub: [@dowankim1024](https://github.com/dowankim1024)
- Blog: [Naver Blog](https://blog.naver.com/kimdowan1004)
- Instagram: [@dowan.kim_developer](https://www.instagram.com/dowan.kim_developer/)

---

이 README는 프로젝트의 주요 기능과 구조를 상세히 설명합니다. 추가 질문이나 개선 사항이 있으면 이슈를 등록해주세요.

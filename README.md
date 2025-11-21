# Dowan Kim Portfolio & Blog

개인 포트폴리오 웹사이트와 프로젝트별 트러블슈팅 블로그를 통합한 Next.js 기반 웹 애플리케이션입니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 변경 사항](#주요-변경-사항)
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
- **동적 렌더링**: Next.js 서버 사이드 렌더링을 통해 실시간으로 Firebase 데이터를 가져와 표시
- **Vercel 배포**: Vercel 플랫폼을 통해 자동 배포 및 서버 사이드 렌더링 지원

## 🔄 주요 변경 사항

### 2024년 업데이트: 정적 사이트에서 동적 렌더링으로 전환

#### 1. 배포 플랫폼 변경
- **이전**: GitHub Pages (정적 사이트)
- **현재**: Vercel (서버 사이드 렌더링)

#### 2. 렌더링 방식 변경
- **이전**: 정적 사이트 생성 (SSG) - 빌드 시점에 모든 페이지 생성
- **현재**: 서버 사이드 렌더링 (SSR) - 요청 시점에 동적으로 렌더링

#### 3. 기술적 변경
- `next.config.js`에서 `output: 'export'` 제거
- 모든 동적 라우트에서 `generateStaticParams()` 제거
- 모든 페이지가 런타임에 동적으로 렌더링됨

#### 4. 기능 개선
- **마크다운 링크 새 창 열기**: 프로젝트 설명과 블로그 글 내의 모든 링크가 새 창에서 열리도록 설정
- **프로젝트 설명 첫 줄 표시**: 프로젝트 목록에서 설명의 첫 번째 줄만 표시
- **동적 라우트 즉시 반영**: 새로운 블로그 글이 재배포 없이 즉시 반영됨

#### 5. 장점
- ✅ 빌드 타임에 모든 경로를 생성할 필요 없음
- ✅ 새로운 콘텐츠가 즉시 반영됨
- ✅ 동적 라우트가 런타임에 자동으로 처리됨
- ✅ Firebase 데이터를 실시간으로 가져옴
- ✅ 자동 스케일링 지원 (Vercel)

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
- **Vercel** - 서버 사이드 렌더링 지원 플랫폼
- **자동 배포** - Git 푸시 시 자동으로 빌드 및 배포

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
- **마크다운 링크 새 창 열기**: 프로젝트 설명과 블로그 글 내의 모든 링크가 새 창에서 열림

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
│   └── deploy.yml                # 배포 자동화 스크립트 (현재 미사용)
├── next.config.js                # Next.js 설정
├── vercel.json                   # Vercel 배포 설정
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

빌드는 `.next/` 디렉토리에 생성되며, Vercel에 배포할 때 자동으로 서버에서 실행됩니다.

### 로컬 프로덕션 서버 실행

```bash
npm run build
npm run start
```

로컬에서 프로덕션 빌드를 테스트할 수 있습니다.

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

### Vercel 배포

이 프로젝트는 Vercel을 통해 배포됩니다. Vercel은 Next.js의 서버 사이드 렌더링을 완벽하게 지원합니다.

#### 1. Vercel 프로젝트 설정

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 연결
4. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (루트 디렉토리)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (자동 감지)

#### 2. 환경 변수 설정

Vercel 프로젝트 설정에서 다음 환경 변수를 추가합니다:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

설정 위치: **Settings → Environment Variables**

#### 3. 자동 배포

`main` 브랜치에 푸시하면 자동으로 빌드 및 배포가 진행됩니다.

- 모든 푸시마다 프리뷰 배포 생성
- `main` 브랜치 푸시 시 프로덕션 배포

#### 4. vercel.json 설정

프로젝트 루트의 `vercel.json` 파일로 배포 설정을 관리합니다:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["icn1"]
}
```

#### 주요 변경 사항 (GitHub Pages → Vercel)

- **렌더링 방식**: 정적 사이트 생성(SSG)에서 서버 사이드 렌더링(SSR)으로 전환
- **동적 라우트**: 빌드 타임이 아닌 런타임에 동적으로 렌더링
- **Firebase 통합**: 런타임에 Firebase에서 실시간으로 데이터 가져오기
- **자동 스케일링**: 트래픽에 따라 자동으로 서버 리소스 확장

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
- 동적 렌더링: 요청 시점에 Firebase에서 데이터를 가져와 렌더링
- 마크다운 링크가 새 창에서 열림

**코드 구조:**
```typescript
interface PageProps {
  params: {
    tag: string
  }
}

export default async function TagPage({ params }: PageProps) {
  const decodedTag = decodeURIComponent(params.tag)
  const project = await getProjectByTag(decodedTag)
  const posts = await getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <section className={styles.section}>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{decodedTag}</h1>
        
        {/* 프로젝트 소개글 (링크는 새 창에서 열림) */}
        {project && project.description && (
          <div className={styles.description}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            >
              {project.description}
            </ReactMarkdown>
          </div>
        )}
        
        {/* 블로그 글 목록 */}
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${encodeURIComponent(decodedTag)}/${encodeURIComponent(post.slug || post.id || '')}`}
              className={styles.postCard}
            >
              <h2 className={styles.postTitle}>{post.title}</h2>
              {/* ... */}
            </Link>
          ))}
        </div>
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
- 마크다운 내 링크가 새 창에서 열림

**코드 구조:**
```typescript
<div className={styles.content}>
  <ReactMarkdown
    rehypePlugins={[rehypeRaw]}
    remarkPlugins={[remarkGfm]}
    components={{
      a: ({ ...props }) => (
        <a {...props} target="_blank" rel="noopener noreferrer" />
      ),
    }}
  >
    {post.content}
  </ReactMarkdown>
</div>
```

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

### 1. 정적 사이트에서 동적 페이지로 전환

**변경 사항**: 프로젝트가 GitHub Pages 정적 배포에서 Vercel 서버 사이드 렌더링으로 전환되었습니다.

**주요 변경:**
- `next.config.js`에서 `output: 'export'` 제거
- 모든 동적 라우트에서 `generateStaticParams()` 제거
- 모든 페이지가 런타임에 동적으로 렌더링됨
- Firebase 데이터를 빌드 타임이 아닌 요청 시점에 가져옴

**장점:**
- 새로운 블로그 글이 즉시 반영됨 (재배포 불필요)
- 빌드 타임에 모든 경로를 생성할 필요 없음
- 동적 라우트가 런타임에 자동으로 처리됨

**주의사항:**
- Vercel 환경 변수 설정 필수
- Firebase 환경 변수가 Vercel 프로젝트 설정에 추가되어 있어야 함

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

### 3. Vercel 배포 시 404 에러

**문제**: Vercel에 배포 후 동적 라우트(`/blog/[tag]`, `/blog/[tag]/[slug]`)에 접근 시 404 에러 발생

**원인**: 
- `generateStaticParams()`를 사용하면 빌드 시점에 생성된 경로만 접근 가능
- 빌드 시점에 Firebase 접근 실패 시 빈 배열 반환으로 인해 경로가 생성되지 않음

**해결**: 
- `generateStaticParams()`를 완전히 제거하여 동적 렌더링으로 전환
- 모든 동적 라우트가 런타임에 동적으로 처리되도록 설정
- 요청 시점에 Firebase에서 데이터를 가져와 렌더링

```typescript
// ✅ 올바른 방법: generateStaticParams() 없이 동적 렌더링
export default async function TagPage({ params }: PageProps) {
  const decodedTag = decodeURIComponent(params.tag)
  const project = await getProjectByTag(decodedTag)
  const posts = await getPostsByTag(decodedTag)
  
  // 런타임에 데이터 가져오기
  // ...
}
```

### 4. Firebase 권한 에러

**문제**: Firestore나 Storage에 접근할 때 권한 에러가 발생합니다.

**해결**: 
1. Firebase 콘솔에서 보안 규칙을 올바르게 설정
2. 에러 처리를 추가하여 앱이 크래시하지 않도록 함
3. Vercel 환경 변수가 올바르게 설정되어 있는지 확인

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

### 5. 마크다운 링크가 새 창에서 열리도록 설정

**구현**: ReactMarkdown의 `components` prop을 사용하여 링크 컴포넌트를 커스터마이징

```typescript
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    a: ({ ...props }) => (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ),
  }}
>
  {content}
</ReactMarkdown>
```

**적용 위치:**
- 프로젝트 설명 (`app/blog/[tag]/page.tsx`)
- 블로그 글 내용 (`app/blog/[tag]/[slug]/page.tsx`)

### 6. 프로젝트 설명 첫 줄만 표시

**구현**: 프로젝트 목록 페이지에서 프로젝트 설명의 첫 번째 줄(엔터 이전)만 표시

```typescript
{project && project.description && (
  <p className={styles.projectDescription}>
    {(() => {
      const firstLine = project.description.split(/\r?\n/)[0] || ''
      return firstLine.length > 50 
        ? `${firstLine.substring(0, 50)}...` 
        : firstLine
    })()}
  </p>
)}
```

## 📝 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.

## 👤 작성자

**Dowan Kim**
- GitHub: [@dowankim1024](https://github.com/dowankim1024)
- Blog: [Naver Blog](https://blog.naver.com/kimdowan1004)
- Instagram: [@dowan.kim_developer](https://www.instagram.com/dowan.kim_developer/)


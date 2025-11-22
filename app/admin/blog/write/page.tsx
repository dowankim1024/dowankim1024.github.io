'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import AuthGuard from '@/components/AuthGuard'
import { createPost, uploadImages, uploadImage, upsertProject } from '@/lib/blog'
import { getCurrentUser } from '@/lib/auth'
import styles from './page.module.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function WritePostPage() {
  const router = useRouter()
  const editorRef = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(true)
  const [createdAt, setCreatedAt] = useState(() => {
    // 현재 날짜와 시간을 YYYY-MM-DDTHH:mm 형식으로 반환
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  })
  const [images, setImages] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  // 클립보드 이미지 붙여넣기 처리
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

            // 임시 ID로 이미지 업로드
            const tempId = `temp_${Date.now()}`
            const imageUrl = await uploadImage(file, tempId)
            
            // 마크다운 형식으로 삽입
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
            
            // 이미지 목록에도 추가
            setImages([...images, file])
            
            // 커서 위치 업데이트 (비동기로 처리)
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

  const generateSlug = (text: string): string => {
    // 한글을 포함한 모든 문자를 URL-safe하게 변환
    // 공백을 하이픈으로 변환하고, 연속된 하이픈을 하나로 통합
    let slug = text
      .trim()
      .replace(/\s+/g, '-') // 공백을 하이픈으로
      .replace(/-+/g, '-') // 연속된 하이픈을 하나로
      .replace(/^-|-$/g, '') // 앞뒤 하이픈 제거
    
    // 빈 문자열이면 타임스탬프 사용
    if (!slug) {
      slug = `post-${Date.now()}`
    }
    
    // 한글은 그대로 유지 (Next.js가 자동으로 URL 인코딩 처리)
    return slug
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setUploading(true)

    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push('/admin/login')
        return
      }

      // 임시 ID 생성 (이미지 업로드용)
      const tempId = `temp_${Date.now()}`
      
      // 이미지 업로드
      let imageUrls: string[] = []
      if (images.length > 0) {
        imageUrls = await uploadImages(images, tempId)
      }

      // Slug 생성
      const slug = generateSlug(title)

      // 태그 추출
      const postTags = tags.split(',').map(t => t.trim()).filter(t => t)

      // 날짜 변환 (문자열 → Date → Timestamp)
      const createdAtDate = new Date(createdAt)

      // 포스트 생성
      await createPost({
        title,
        content,
        images: imageUrls,
        author: user.uid,
        tags: postTags,
        published,
        slug,
        createdAt: createdAtDate,
      })

      // 각 태그에 대해 프로젝트 생성 또는 업데이트 (기본 설명 없음)
      for (const tag of postTags) {
        await upsertProject(tag, '')
      }

      router.push('/admin/blog')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '글 작성 중 오류가 발생했습니다.'
      setError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  return (
    <AuthGuard>
      <div className={styles.container}>
        <h1 className={styles.title}>새 글 작성</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={uploading}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="content">내용 (마크다운)</label>
            {uploadingImage && (
              <p className={styles.uploading}>이미지 업로드 중...</p>
            )}
            <div 
              ref={editorRef}
              data-color-mode="dark"
              onPaste={(e) => {
                // React의 합성 이벤트를 네이티브 이벤트로 변환
                const nativeEvent = e.nativeEvent as ClipboardEvent
                if (nativeEvent.clipboardData) {
                  const items = nativeEvent.clipboardData.items
                  for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                      e.preventDefault()
                      break
                    }
                  }
                }
              }}
            >
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || '')}
                height={500}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="tags">태그 (쉼표로 구분)</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="예: React, Next.js, Firebase"
              disabled={uploading}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="createdAt">작성 날짜</label>
            <input
              id="createdAt"
              type="datetime-local"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              disabled={uploading}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="images">이미지 업로드</label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className={styles.fileInput}
            />
            {images.length > 0 && (
              <div className={styles.imagePreview}>
                {images.map((image, index) => (
                  <div key={index} className={styles.imageItem}>
                    <span>{image.name}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className={styles.removeButton}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                disabled={uploading}
              />
              공개하기
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelButton}
              disabled={uploading}
            >
              취소
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={uploading || !title || !content}
            >
              {uploading ? '업로드 중...' : '작성하기'}
            </button>
          </div>
        </form>
      </div>
    </AuthGuard>
  )
}


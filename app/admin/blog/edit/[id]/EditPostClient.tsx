'use client'

import { useState, useEffect, FormEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import AuthGuard from '@/components/AuthGuard'
import { getPost, updatePost, uploadImages, uploadImage } from '@/lib/blog'
import { getCurrentUser } from '@/lib/auth'
import styles from '@/app/admin/blog/write/page.module.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface EditPostClientProps {
  postId: string
}

export default function EditPostClient({ postId }: EditPostClientProps) {
  const router = useRouter()
  const editorRef = useRef<HTMLDivElement>(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPost = async () => {
    try {
      const post = await getPost(postId)
      if (post) {
        setTitle(post.title)
        setContent(post.content)
        setTags(post.tags?.join(', ') || '')
        setPublished(post.published)
        setExistingImages(post.images || [])
      }
    } catch {
      setError('포스트를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index))
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

            // 포스트 ID로 이미지 업로드
            const imageUrl = await uploadImage(file, postId)
            
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
  }, [content, images, postId])

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

      // 새 이미지 업로드
      let newImageUrls: string[] = []
      if (images.length > 0) {
        newImageUrls = await uploadImages(images, postId)
      }

      // 기존 이미지와 새 이미지 합치기
      const allImageUrls = [...existingImages, ...newImageUrls]

      // 포스트 업데이트
      await updatePost(postId, {
        title,
        content,
        images: allImageUrls,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        published,
      })

      router.push('/admin/blog')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '글 수정 중 오류가 발생했습니다.'
      setError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className={styles.container}>
          <p className={styles.loading}>로딩 중...</p>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className={styles.container}>
        <h1 className={styles.title}>글 수정</h1>
        
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

          {existingImages.length > 0 && (
            <div className={styles.inputGroup}>
              <label>기존 이미지</label>
              <div className={styles.imagePreview}>
                {existingImages.map((url, index) => (
                  <div key={index} className={styles.imageItem}>
                    <span>{url.split('/').pop()}</span>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className={styles.removeButton}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="images">새 이미지 업로드</label>
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
              {uploading ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </form>
      </div>
    </AuthGuard>
  )
}


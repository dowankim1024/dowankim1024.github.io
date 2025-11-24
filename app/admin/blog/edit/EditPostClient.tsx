'use client'

import { useState, useEffect, FormEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import AuthGuard from '@/components/AuthGuard'
import { getPost, updatePost, uploadImages, uploadImage } from '@/lib/blog'
import { getCurrentUser } from '@/lib/auth'

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
  const [createdAt, setCreatedAt] = useState('')
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
        
        // createdAt 날짜를 datetime-local 형식으로 변환
        const date = post.createdAt instanceof Date 
          ? post.createdAt 
          : 'toDate' in post.createdAt 
            ? (post.createdAt as { toDate: () => Date }).toDate()
            : new Date(post.createdAt as string | number)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        setCreatedAt(`${year}-${month}-${day}T${hours}:${minutes}`)
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

  // 클립보드 이미지/비디오 붙여넣기 처리
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const isImage = item.type.indexOf('image') !== -1
        const isVideo = item.type.indexOf('video') !== -1
        
        if (isImage || isVideo) {
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

            // 포스트 ID로 파일 업로드
            const fileUrl = await uploadImage(file, postId)
            
            // 이미지 또는 비디오에 따라 다른 형식으로 삽입
            let markdown = ''
            if (isImage) {
              markdown = `\n![${file.name}](${fileUrl})\n`
            } else {
              // HTML video 태그 사용 (rehype-raw가 HTML을 지원하므로)
              markdown = `\n<video controls width="100%">\n  <source src="${fileUrl}" type="${item.type}">\n  Your browser does not support the video tag.\n</video>\n`
            }
            
            // MDEditor 내부의 textarea에서 커서 위치 가져오기
            let cursorPos = content.length
            if (editorRef.current) {
              const textarea = editorRef.current.querySelector('textarea') as HTMLTextAreaElement
              if (textarea) {
                cursorPos = textarea.selectionStart || content.length
              }
            }
            
            const newContent = content.slice(0, cursorPos) + markdown + content.slice(cursorPos)
            setContent(newContent)
            
            // 이미지 목록에도 추가 (비디오도 포함)
            setImages([...images, file])
            
            // 커서 위치 업데이트 (비동기로 처리)
            setTimeout(() => {
              if (editorRef.current) {
                const textarea = editorRef.current.querySelector('textarea') as HTMLTextAreaElement
                if (textarea) {
                  const newCursorPos = cursorPos + markdown.length
                  textarea.setSelectionRange(newCursorPos, newCursorPos)
                  textarea.focus()
                }
              }
            }, 0)
          } catch (err) {
            console.error('파일 업로드 실패:', err)
            alert(`${isImage ? '이미지' : '비디오'} 업로드에 실패했습니다.`)
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

      // 날짜 변환 (문자열 → Date)
      const createdAtDate = new Date(createdAt)

      // 포스트 업데이트
      await updatePost(postId, {
        title,
        content,
        images: allImageUrls,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        published,
        createdAt: createdAtDate,
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
        <div className="min-h-screen bg-[#050a13] text-white pt-32 px-4 pb-16">
          <p className="text-center text-xl opacity-60 py-16">로딩 중...</p>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#050a13] text-white pt-32 px-4 pb-16">
        <h1 className="text-4xl text-[#03e8f9] mb-12 text-center">글 수정</h1>
        
        <form onSubmit={handleSubmit} className="max-w-[1000px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label htmlFor="title" className="text-lg font-bold text-white">제목</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={uploading}
              className="px-3 py-3 border border-[rgba(3,232,249,0.3)] rounded-lg bg-[#1b1e26] text-white text-base transition-[border-color] duration-300 focus:outline-none focus:border-[#03e8f9] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-lg font-bold text-white">내용 (마크다운)</label>
            {uploadingImage && (
              <p className="text-[#03e8f9] text-sm my-0 px-2 py-2 bg-[rgba(3,232,249,0.1)] rounded">파일 업로드 중...</p>
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
                    const item = items[i]
                    if (item.type.indexOf('image') !== -1 || item.type.indexOf('video') !== -1) {
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

          <div className="flex flex-col gap-3">
            <label htmlFor="tags" className="text-lg font-bold text-white">태그 (쉼표로 구분)</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="예: React, Next.js, Firebase"
              disabled={uploading}
              className="px-3 py-3 border border-[rgba(3,232,249,0.3)] rounded-lg bg-[#1b1e26] text-white text-base transition-[border-color] duration-300 focus:outline-none focus:border-[#03e8f9] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="createdAt" className="text-lg font-bold text-white">작성 날짜</label>
            <input
              id="createdAt"
              type="datetime-local"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              disabled={uploading}
              className="px-3 py-3 border border-[rgba(3,232,249,0.3)] rounded-lg bg-[#1b1e26] text-white text-base transition-[border-color] duration-300 focus:outline-none focus:border-[#03e8f9] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {existingImages.length > 0 && (
            <div className="flex flex-col gap-3">
              <label className="text-lg font-bold text-white">기존 이미지</label>
              <div className="flex flex-col gap-2 mt-2">
                {existingImages.map((url, index) => (
                  <div key={index} className="flex justify-between items-center px-3 py-3 bg-[#1b1e26] rounded-lg border border-[rgba(3,232,249,0.2)]">
                    <span>{url.split('/').pop()}</span>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="px-4 py-2 bg-[#fd6413] text-white border-none rounded cursor-pointer text-sm transition-all duration-300 hover:bg-transparent hover:text-[#fd6413] hover:border hover:border-[#fd6413]"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <label htmlFor="images" className="text-lg font-bold text-white">새 이미지/비디오 업로드</label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="px-3 py-3 border border-[rgba(3,232,249,0.3)] rounded-lg bg-[#1b1e26] text-white text-base transition-[border-color] duration-300 focus:outline-none focus:border-[#03e8f9] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {images.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                {images.map((image, index) => (
                  <div key={index} className="flex justify-between items-center px-3 py-3 bg-[#1b1e26] rounded-lg border border-[rgba(3,232,249,0.2)]">
                    <span>{image.name}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="px-4 py-2 bg-[#fd6413] text-white border-none rounded cursor-pointer text-sm transition-all duration-300 hover:bg-transparent hover:text-[#fd6413] hover:border hover:border-[#fd6413]"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="published" className="flex items-center gap-2 cursor-pointer">
              <input
                id="published"
                name="published"
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                disabled={uploading}
                className="w-5 h-5 cursor-pointer"
              />
              공개하기
            </label>
          </div>

          {error && <p className="text-[#fd6413] text-sm text-center my-0">{error}</p>}

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 rounded-lg font-bold cursor-pointer transition-all duration-300 border-none text-base bg-[#1b1e26] text-white border border-[rgba(3,232,249,0.3)] hover:border-[#03e8f9] hover:text-[#03e8f9] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={uploading}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg font-bold cursor-pointer transition-all duration-300 border-none text-base bg-[#03e8f9] text-[#050a13] hover:bg-transparent hover:text-[#03e8f9] hover:border hover:border-[#03e8f9] disabled:opacity-50 disabled:cursor-not-allowed"
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


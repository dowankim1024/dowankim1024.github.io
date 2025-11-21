import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from './firebase'
import { BlogPost, Project } from '@/types/blog'

const POSTS_COLLECTION = 'posts'
const PROJECTS_COLLECTION = 'projects'

// 모든 포스트 가져오기 (공개된 것만)
export const getPublishedPosts = async (): Promise<BlogPost[]> => {
  const q = query(
    collection(db, POSTS_COLLECTION),
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  })) as BlogPost[]
}

// 모든 포스트 가져오기 (관리자용)
export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, POSTS_COLLECTION),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as BlogPost[]
  } catch (error) {
    console.error('포스트 가져오기 실패:', error)
    // 권한 에러 등으로 실패하면 빈 배열 반환
    return []
  }
}

// 단일 포스트 가져오기
export const getPost = async (id: string): Promise<BlogPost | null> => {
  const docRef = doc(db, POSTS_COLLECTION, id)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) {
    return null
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt.toDate(),
    updatedAt: docSnap.data().updatedAt.toDate(),
  } as BlogPost
}

// 이미지 업로드
export const uploadImage = async (file: File, postId: string): Promise<string> => {
  const fileName = `${postId}/${Date.now()}_${file.name}`
  const storageRef = ref(storage, `blog-images/${fileName}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

// 여러 이미지 업로드
export const uploadImages = async (files: File[], postId: string): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadImage(file, postId))
  return Promise.all(uploadPromises)
}

// 포스트 생성
export const createPost = async (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const now = Timestamp.now()
  const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
    ...postData,
    createdAt: now,
    updatedAt: now,
  })
  return docRef.id
}

// 포스트 업데이트
export const updatePost = async (id: string, postData: Partial<BlogPost>): Promise<void> => {
  const docRef = doc(db, POSTS_COLLECTION, id)
  await updateDoc(docRef, {
    ...postData,
    updatedAt: Timestamp.now(),
  })
}

// 포스트 삭제
export const deletePost = async (id: string, imageUrls: string[]): Promise<void> => {
  // Firestore에서 삭제
  const docRef = doc(db, POSTS_COLLECTION, id)
  await deleteDoc(docRef)
  
  // Storage에서 이미지 삭제
  const deleteImagePromises = imageUrls.map(url => {
    const imageRef = ref(storage, url)
    return deleteObject(imageRef).catch(() => {
      // 이미지 삭제 실패해도 계속 진행
    })
  })
  await Promise.all(deleteImagePromises)
}

// Slug로 포스트 가져오기
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  // URL 인코딩된 slug를 디코딩
  const decodedSlug = decodeURIComponent(slug)
  
  const q = query(
    collection(db, POSTS_COLLECTION),
    where('slug', '==', decodedSlug),
    where('published', '==', true)
  )
  const snapshot = await getDocs(q)
  
  if (snapshot.empty) {
    return null
  }
  
  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  } as BlogPost
}

// 특정 태그의 포스트 가져오기
export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  const q = query(
    collection(db, POSTS_COLLECTION),
    where('tags', 'array-contains', tag),
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  })) as BlogPost[]
}

// 모든 프로젝트(태그) 가져오기
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const q = query(
      collection(db, PROJECTS_COLLECTION),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Project[]
  } catch (error) {
    console.error('프로젝트 가져오기 실패:', error)
    // 권한 에러 등으로 실패하면 빈 배열 반환
    return []
  }
}

// 특정 태그의 프로젝트 가져오기
export const getProjectByTag = async (tag: string): Promise<Project | null> => {
  try {
    const q = query(
      collection(db, PROJECTS_COLLECTION),
      where('tag', '==', tag)
    )
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      return null
    }
    
    const doc = snapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    } as Project
  } catch (error) {
    console.error('프로젝트 가져오기 실패:', error)
    // 권한 에러 등으로 실패하면 null 반환
    return null
  }
}

// 프로젝트 생성 또는 업데이트
export const upsertProject = async (tag: string, description: string): Promise<string> => {
  const q = query(
    collection(db, PROJECTS_COLLECTION),
    where('tag', '==', tag)
  )
  const snapshot = await getDocs(q)
  
  const now = Timestamp.now()
  
  if (snapshot.empty) {
    // 새 프로젝트 생성
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      tag,
      description,
      createdAt: now,
      updatedAt: now,
    })
    return docRef.id
  } else {
    // 기존 프로젝트 업데이트
    const docRef = snapshot.docs[0].ref
    await updateDoc(docRef, {
      description,
      updatedAt: now,
    })
    return docRef.id
  }
}

// 프로젝트 업데이트
export const updateProject = async (id: string, description: string): Promise<void> => {
  const docRef = doc(db, PROJECTS_COLLECTION, id)
  await updateDoc(docRef, {
    description,
    updatedAt: Timestamp.now(),
  })
}

// 모든 태그 목록 가져오기 (포스트에서 사용된 태그)
export const getAllTags = async (): Promise<string[]> => {
  const posts = await getPublishedPosts()
  const tagSet = new Set<string>()
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag))
    }
  })
  return Array.from(tagSet).sort()
}


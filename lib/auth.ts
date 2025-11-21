import { 
  signInWithEmailAndPassword, 
  signOut, 
  User,
  onAuthStateChanged 
} from 'firebase/auth'
import { auth } from './firebase'

type AuthResult = {
  user: User | null
  error: string | null
}

type LogoutResult = {
  error: string | null
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return '알 수 없는 오류가 발생했습니다.'
}

export const login = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: unknown) {
    return { user: null, error: getErrorMessage(error) }
  }
}

export const logout = async (): Promise<LogoutResult> => {
  try {
    await signOut(auth)
    return { error: null }
  } catch (error: unknown) {
    return { error: getErrorMessage(error) }
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}


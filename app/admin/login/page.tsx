'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { user, error: loginError } = await login(email, password)
    
    if (loginError) {
      setError(loginError)
      setLoading(false)
    } else if (user) {
      router.push('/admin/blog')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a13] p-8">
      <div className="bg-[#1b1e26] p-12 rounded-2xl border border-[rgba(3,232,249,0.2)] w-full max-w-[400px]">
        <h1 className="text-[#03e8f9] text-3xl mb-8 text-center">관리자 로그인</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white text-sm">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="px-3 py-3 border border-[rgba(3,232,249,0.3)] rounded-lg bg-[#050a13] text-white text-base transition-[border-color] duration-300 focus:outline-none focus:border-[#03e8f9] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white text-sm">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="px-3 py-3 border border-[rgba(3,232,249,0.3)] rounded-lg bg-[#050a13] text-white text-base transition-[border-color] duration-300 focus:outline-none focus:border-[#03e8f9] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          {error && <p className="text-[#fd6413] text-sm text-center my-0">{error}</p>}
          <button 
            type="submit" 
            className="px-3 py-3 bg-[#03e8f9] text-[#050a13] border-none rounded-lg text-base font-bold cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-[#03e8f9] hover:border hover:border-[#03e8f9] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}


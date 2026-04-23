'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export type ScatterPointer = { x: number; y: number; active: boolean }

export type ScatterPhysicsApi = {
  reduced: boolean
  subscribe: (fn: () => void) => () => void
  getPointer: () => ScatterPointer
}

export const ScatterPhysicsContext = createContext<ScatterPhysicsApi | null>(null)

export function useScatterPhysics(): ScatterPhysicsApi | null {
  return useContext(ScatterPhysicsContext)
}

export default function ScatterPhysicsZone({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(true)
  const zoneRef = useRef<HTMLDivElement>(null)
  const subsRef = useRef(new Set<() => void>())
  const ptrRef = useRef<ScatterPointer>({ x: 0, y: 0, active: false })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const subscribe = useCallback((fn: () => void) => {
    subsRef.current.add(fn)
    return () => {
      subsRef.current.delete(fn)
    }
  }, [])

  const getPointer = useCallback(() => ptrRef.current, [])

  useEffect(() => {
    if (reduced) return
    const z = zoneRef.current
    if (!z) return

    const onMove = (e: MouseEvent) => {
      ptrRef.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const onLeave = () => {
      ptrRef.current = { ...ptrRef.current, active: false }
    }
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return
      ptrRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        active: true,
      }
    }

    z.addEventListener('mousemove', onMove)
    z.addEventListener('mouseleave', onLeave)
    z.addEventListener('touchmove', onTouch, { passive: true })
    z.addEventListener('touchend', onLeave)

    const loop = () => {
      subsRef.current.forEach((fn) => fn())
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      z.removeEventListener('mousemove', onMove)
      z.removeEventListener('mouseleave', onLeave)
      z.removeEventListener('touchmove', onTouch)
      z.removeEventListener('touchend', onLeave)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [reduced])

  const api = useMemo(
    (): ScatterPhysicsApi => ({
      reduced,
      subscribe,
      getPointer,
    }),
    [reduced, subscribe, getPointer]
  )

  return (
    <ScatterPhysicsContext.Provider value={api}>
      <div ref={zoneRef} className="relative">
        {children}
      </div>
    </ScatterPhysicsContext.Provider>
  )
}

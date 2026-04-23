'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { DAMP, PUSH_FORCE, PUSH_RADIUS, ROTATE_K, SPRING } from './scatterConstants'
import { useScatterPhysics } from './ScatterPhysicsZone'

type ScatterBlockProps = {
  children: ReactNode
  className?: string
}

export default function ScatterBlock({ children, className = '' }: ScatterBlockProps) {
  const scatter = useScatterPhysics()
  const [physicsOn, setPhysicsOn] = useState(false)

  const wrapRef = useRef<HTMLDivElement>(null)
  const oxRef = useRef(0)
  const oyRef = useRef(0)
  const vxRef = useRef(0)
  const vyRef = useRef(0)

  const tickRef = useRef<() => void>(() => {})

  useEffect(() => {
    if (!scatter) return
    if (scatter.reduced) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setPhysicsOn(true)
  }, [scatter])

  tickRef.current = () => {
    if (!physicsOn || !wrapRef.current) return
    const p = scatter?.getPointer() ?? { x: 0, y: 0, active: false }
    const er = wrapRef.current.getBoundingClientRect()
    const inside =
      p.active && p.x >= er.left && p.x <= er.right && p.y >= er.top && p.y <= er.bottom

    const mx = p.x - er.left
    const my = p.y - er.top
    const hx = er.width / 2
    const hy = er.height / 2

    const ox = oxRef.current
    const oy = oyRef.current

    let fx = -SPRING * ox
    let fy = -SPRING * oy

    if (inside) {
      const px = hx + ox
      const py = hy + oy
      const dx = px - mx
      const dy = py - my
      const dist = Math.hypot(dx, dy) + 0.001
      if (dist < PUSH_RADIUS) {
        const push = (1 - dist / PUSH_RADIUS) * PUSH_FORCE
        fx += (dx / dist) * push
        fy += (dy / dist) * push
      }
    }

    vxRef.current = (vxRef.current + fx) * DAMP
    vyRef.current = (vyRef.current + fy) * DAMP
    oxRef.current += vxRef.current
    oyRef.current += vyRef.current

    const nx = oxRef.current
    const ny = oyRef.current
    const rot = nx * ROTATE_K * 0.35
    wrapRef.current.style.transform = `translate3d(${nx}px,${ny}px,0) rotate(${rot}deg)`
  }

  useEffect(() => {
    if (!physicsOn || !scatter || scatter.reduced) return
    return scatter.subscribe(() => tickRef.current())
  }, [physicsOn, scatter])

  if (!physicsOn) {
    return <div className={className.trim()}>{children}</div>
  }

  return (
    <div
      ref={wrapRef}
      className={`will-change-transform ${className}`.trim()}
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      {children}
    </div>
  )
}

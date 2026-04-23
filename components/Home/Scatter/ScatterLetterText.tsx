'use client'

import { useRef, useEffect, useLayoutEffect, useMemo, useCallback, useState } from 'react'
import { DAMP, PUSH_FORCE, PUSH_RADIUS, ROTATE_K, SPRING } from './scatterConstants'
import { useScatterPhysics } from './ScatterPhysicsZone'

type ScatterTag = 'p' | 'span' | 'h2' | 'h3' | 'strong' | 'div'

type ScatterLetterTextProps = {
  text: string
  className?: string
  segmentLocale?: string
  /** 시맨틱 태그 (기본 `p`) */
  as?: ScatterTag
}

function splitGraphemes(text: string, locale: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const seg = new Intl.Segmenter(locale, { granularity: 'grapheme' })
    return Array.from(seg.segment(text), (s) => s.segment)
  }
  return [...text]
}

export default function ScatterLetterText({
  text,
  className = '',
  segmentLocale = 'ko',
  as = 'p',
}: ScatterLetterTextProps) {
  const Tag = as
  const segments = useMemo(() => splitGraphemes(text, segmentLocale), [text, segmentLocale])
  const scatter = useScatterPhysics()

  const [physicsOn, setPhysicsOn] = useState(false)

  const containerRef = useRef<HTMLElement | null>(null)
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([])
  const homesRef = useRef<{ x: number; y: number }[]>([])
  const oxRef = useRef<number[]>([])
  const oyRef = useRef<number[]>([])
  const vxRef = useRef<number[]>([])
  const vyRef = useRef<number[]>([])

  const tickRef = useRef<() => void>(() => {})

  useEffect(() => {
    if (!scatter) return
    if (scatter.reduced) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setPhysicsOn(true)
  }, [scatter])

  const measureHomes = useCallback(() => {
    const root = containerRef.current
    if (!root) return
    const n = segments.length
    const rect = root.getBoundingClientRect()
    for (let i = 0; i < n; i++) {
      const el = spanRefs.current[i]
      if (!el) continue
      const er = el.getBoundingClientRect()
      homesRef.current[i] = {
        x: er.left + er.width / 2 - rect.left,
        y: er.top + er.height / 2 - rect.top,
      }
    }
  }, [segments.length])

  useEffect(() => {
    const n = segments.length
    homesRef.current = new Array(n).fill(null).map(() => ({ x: 0, y: 0 }))
    oxRef.current = new Array(n).fill(0)
    oyRef.current = new Array(n).fill(0)
    vxRef.current = new Array(n).fill(0)
    vyRef.current = new Array(n).fill(0)
    spanRefs.current = new Array(n).fill(null)
  }, [segments.length])

  useLayoutEffect(() => {
    if (!physicsOn) return
    measureHomes()
  }, [physicsOn, measureHomes, segments.length])

  tickRef.current = () => {
    if (!physicsOn || !containerRef.current) return
    const root = containerRef.current
    const p = scatter?.getPointer() ?? { x: 0, y: 0, active: false }
    const rr = root.getBoundingClientRect()
    const inside =
      p.active && p.x >= rr.left && p.x <= rr.right && p.y >= rr.top && p.y <= rr.bottom
    const mx = p.x - rr.left
    const my = p.y - rr.top
    const n = segments.length

    for (let i = 0; i < n; i++) {
      const home = homesRef.current[i]
      if (!home) continue
      const ox = oxRef.current[i]
      const oy = oyRef.current[i]

      let fx = -SPRING * ox
      let fy = -SPRING * oy

      if (inside) {
        const px = home.x + ox
        const py = home.y + oy
        const dx = px - mx
        const dy = py - my
        const dist = Math.hypot(dx, dy) + 0.001
        if (dist < PUSH_RADIUS) {
          const push = (1 - dist / PUSH_RADIUS) * PUSH_FORCE
          fx += (dx / dist) * push
          fy += (dy / dist) * push
        }
      }

      vxRef.current[i] = (vxRef.current[i] + fx) * DAMP
      vyRef.current[i] = (vyRef.current[i] + fy) * DAMP
      oxRef.current[i] += vxRef.current[i]
      oyRef.current[i] += vyRef.current[i]

      const el = spanRefs.current[i]
      if (el) {
        const nx = oxRef.current[i]
        const ny = oyRef.current[i]
        const rot = nx * ROTATE_K
        el.style.transform = `translate3d(${nx}px,${ny}px,0) rotate(${rot}deg)`
      }
    }
  }

  useEffect(() => {
    if (!physicsOn || !scatter || scatter.reduced) return
    const root = containerRef.current
    if (!root) return

    const unsub = scatter.subscribe(() => tickRef.current())

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => measureHomes())
    })
    ro.observe(root)
    requestAnimationFrame(() => measureHomes())

    return () => {
      unsub()
      ro.disconnect()
    }
  }, [physicsOn, scatter, measureHomes])

  if (!physicsOn) {
    return <Tag className={className.trim()}>{text}</Tag>
  }

  return (
    <>
      <span className="sr-only">{text}</span>
      <Tag
        ref={(el) => {
          containerRef.current = el
        }}
        aria-hidden
        className={`m-0 cursor-default select-none ${className}`.trim()}
      >
        {segments.map((seg, i) => (
          <span
            key={i}
            ref={(el) => {
              spanRefs.current[i] = el
            }}
            className="inline-block will-change-transform"
            style={{ transform: 'translate3d(0,0,0)' }}
          >
            {seg === ' ' ? '\u00a0' : seg}
          </span>
        ))}
      </Tag>
    </>
  )
}

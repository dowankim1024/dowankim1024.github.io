import type { ReactNode } from 'react'

/** 홈·어바웃 구역 공통 배경만 유지 (이전 왜곡/캔버스 효과 제거) */
export default function HomeAboutWaveSurface({ children }: { children: ReactNode }) {
  return <div className="relative overflow-x-clip bg-[#050a13]">{children}</div>
}

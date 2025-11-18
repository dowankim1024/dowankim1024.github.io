export const NAV_SECTIONS = ['home', 'about', 'career', 'work', 'contact'] as const

export type NavSection = typeof NAV_SECTIONS[number]

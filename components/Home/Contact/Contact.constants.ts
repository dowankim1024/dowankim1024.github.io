export interface ContactLink {
  href: string
  iconClass: string
  title: string
}

export const CONTACT_EMAIL = 'kimdowan1004@naver.com'

export const contactLinks: ContactLink[] = [
  {
    href: 'https://github.com/dowankim1024',
    iconClass: 'fa-brands fa-github',
    title: 'my github link',
  },
  {
    href: 'https://blog.naver.com/kimdowan1004',
    iconClass: 'fa-solid fa-blog',
    title: 'my blog link',
  },
  {
    href: 'https://www.instagram.com/dowan.kim_art?igsh=dWFrazJlbDZmd29v',
    iconClass: 'fa-brands fa-instagram',
    title: 'my instagram link',
  },
]

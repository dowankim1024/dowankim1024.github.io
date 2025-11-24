import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dowankim.site'
const defaultOgImage = `${siteUrl}/images/og.webp`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dowan Kim Portfolio',
    template: '%s | Dowan Kim',
  },
  description: '프론트엔드 개발자 김도완의 포트폴리오와 블로그',
  authors: [{ name: 'Dowan Kim' }],
  keywords: [
    'Dowan Kim',
    '김도완',
    'Frontend',
    'Next.js',
    'React',
    'Portfolio',
    'Blog',
  ],
  openGraph: {
    title: 'Dowan Kim Portfolio',
    type: 'website',
    url: siteUrl,
    siteName: 'Dowan Kim Portfolio',
    description: '프론트엔드 개발자 김도완의 대표 프로젝트와 블로그 글',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Dowan Kim Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dowan Kim Portfolio',
    description: '프론트엔드 개발자 김도완의 대표 프로젝트와 블로그 글',
    images: [defaultOgImage],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSans.variable}>
      <head>
        <link rel="shortcut icon" href="/images/fav.ico" type="image/x-icon" />
      </head>
      <body className={notoSans.className}>
        <Script
          src="https://kit.fontawesome.com/a13d39dcb0.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  )
}


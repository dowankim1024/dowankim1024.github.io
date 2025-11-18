import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans',
})

export const metadata: Metadata = {
  title: "Dowan Kim' Portfolio",
  description: 'Portfolio for Dowan Kim',
  authors: [{ name: 'Dowan Kim' }],
  openGraph: {
    title: 'DK_Portfolio',
    type: 'website',
    url: 'https://dowankim1024.github.io/portfolio/',
    images: [
      {
        url: 'https://dowankim1024.github.io/portfolio/images/og.webp',
      },
    ],
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


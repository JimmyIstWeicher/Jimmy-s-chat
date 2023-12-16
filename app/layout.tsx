import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JimmyChat',
  description: 'Sprich mit Jimmy',
  manifest: "/manifest.json",
  icons: {apple: "/icon.png"},
  themeColor: "#dc8850",
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body data-theme="retro" className={inter.className}>{children}</body>
    </html>
  )
}

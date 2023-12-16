import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JimmyChat',
  description: 'Sprich mit Jimmy',
  manifest: "/manifest.json",
  icons: {apple: "/icon.png"},
  themeColor: "#64b5f6"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body data-theme="retro" className={inter.className}>{children}</body>
    </html>
  )
}

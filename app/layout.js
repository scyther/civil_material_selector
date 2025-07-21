import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI-Powered Building Material Selector - India',
  description: 'Professional material selection and analysis for Indian civil engineers and architects. Get AI-powered recommendations for construction materials based on Indian building codes (NBC 2016), climate zones, and market conditions.',
  keywords: 'building materials india, construction india, civil engineering, architecture, material selection, AI, NBC 2016, IS codes, monsoon construction, seismic zones, GRIHA, IGBC',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

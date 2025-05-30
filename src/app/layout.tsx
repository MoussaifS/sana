// app/layout.tsx
import type { Metadata } from 'next'
import { El_Messiri } from 'next/font/google' // Corrected import name
import './globals.css'
import Header from './components/landing/Header'

const elMessiri = El_Messiri({ // Corrected font function name
  subsets: ['arabic', 'latin'], // Include Arabic for Saudi audience
  variable: '--font-el-messiri', // CSS variable for Tailwind
  weight: ['400', '500', '600', '700'], // Specify weights you'll use
})

export const metadata: Metadata = {
  title: 'SANA - The Future of Equestrian Care',
  description: 'Revolutionizing equestrian care with seamless booking, product marketplace, and horse profiles.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${elMessiri.variable} font-elmessiri bg-sana-neutral-light text-gray-800`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
import { ThemeProvider } from '@/components/theme-provider'
import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({subsets:['latin'],weight:['500']})

export const metadata: Metadata = {
  title: `Shiven Royal's Portfolio`,
  description: 'Portfolio of Shiven Royal, A full stack developer and a mind ready to explore!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en ">
      <body className={`${poppins.className} bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        </ThemeProvider>
        </body>
    </html>
  )
}

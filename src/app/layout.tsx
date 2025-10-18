import type { Metadata } from 'next'
import { Inter, Montserrat, Poppins, IBM_Plex_Sans_Devanagari } from 'next/font/google'
import './globals.css'

const ibmPlexSansDevanagari = IBM_Plex_Sans_Devanagari({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'devanagari'],
  display: 'swap',
  variable: '--font-ibm-plex-sans-devanagari',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat' 
})

const poppins = Poppins({ 
  subsets: ['latin'], 
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'The Purple Movement',
  description: 'Beyond Syllabus, Beyond Gatekeepers, Beyond Borders',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${montserrat.variable} ${poppins.variable} ${ibmPlexSansDevanagari.variable}`}>
      <body className="bg-slate-950 font-inter w-full min-h-screen">
        {children}
      </body>
    </html>
  );
}

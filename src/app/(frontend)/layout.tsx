import { Noto_Sans_JP } from 'next/font/google'
import './main.scss'
import './styles.css'

type RootLayoutProps = {
  children: React.ReactNode
}

// Load Noto Sans JP font with swap display and latin subset
const noto = Noto_Sans_JP({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto',
})

/**
 * Root layout.
 * Sets up global styles, font, and favicon.
 */

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='ja' className={noto.className}>
      <head>
        <link href='/favicon.svg' rel='icon' />
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css'
          rel='stylesheet'
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

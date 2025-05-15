import { RealViewport } from 'lib'
import { sorosSans } from 'styles'
import { Lenis } from 'components'
import { Analytics } from '@vercel/analytics/next'

import '/styles/globals.css'

const title = 'SOROS | The Future of Shopping is Crypto'
const description = `SOROS is the world’s first online marketplace that connects global crypto consumers with sellers, creating an easy, secure way to shop with crypto.`

export const metadata = {
  title: {
    template: '%s | SOROS',
    default: title,
  },
  description: description,
  keywords: [
    'crypto marketplace',
    'decentralized marketplace',
    'shop with crypto',
    'buy products with Bitcoin',
    'Ethereum shopping platform',
    'Solana e-commerce',
    'blockchain shopping',
    'crypto e-commerce platform',
    'web3 marketplace',
  ],
  openGraph: {
    title: title,
    description: description,
    url: 'https://www.shopsoros.com',
    locale: 'en_US',
    type: 'website',
    images: {
      url: `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.shopsoros.com'
      }/images/og-image.jpg`,
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    creator: '@ricenter',
    images: [
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.shopsoros.com'
      }/images/og-image.jpg`,
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      className={sorosSans.className}
      lang="en-US"
      dir="ltr"
      suppressHydrationWarning
    >
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="referrer" content="no-referrer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="US" />

        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="SOROS" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <RealViewport />
        <Lenis root />
        <Analytics />
      </body>
    </html>
  )
}

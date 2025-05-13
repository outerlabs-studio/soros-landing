import localFont from 'next/font/local'

const sorosSans = localFont({
  src: [
    {
      path: '../public/fonts/SOROS-Sans-Roman-VF.woff2',
      weight: '400 800',
      style: 'normal',
    },
    {
      path: '../public/fonts/SOROS-Sans-Italic-VF.woff2',
      weight: '400 800',
      style: 'italic',
    },
  ],
  variable: '--font-soros',
  display: 'swap',
})

export default sorosSans

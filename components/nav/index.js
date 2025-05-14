'use client'

import CustomButton from 'components/button'
import Icons from 'components/icons'
import Link from 'next/link'
import { useLenis } from 'lenis/react'
import { Container } from 'styles'
import { track } from '@vercel/analytics'

export default function Nav() {
  const lenis = useLenis()

  return (
    <header className="bg-black/70 border-b-1 border-b-light-gray border-solid backdrop-blur-md fixed top-0 w-full z-50 py-3">
      <Container>
        <div className="flex justify-between items-center">
          <Link
            onClick={(e) => {
              e.preventDefault()

              lenis.scrollTo(0)
            }}
            id="nav-logo"
            className="w-25"
            href={'/'}
          >
            <Icons name="soros-logo" />
          </Link>

          <nav className="flex gap-5 items-center">
            <Link
              className="text-xs font-normal hover:opacity-60 transition-opacity duration-300"
              href="#features-section"
              onClick={(e) => {
                e.preventDefault()

                lenis.scrollTo('#features-section')
              }}
            >
              Features
            </Link>
            <Link
              className="text-xs font-normal hover:opacity-60 transition-opacity duration-300"
              href="#about-section"
              onClick={(e) => {
                e.preventDefault()

                lenis.scrollTo('#about-section')
              }}
            >
              About
            </Link>
            <CustomButton
              primary
              href="/"
              onClick={() => {
                track('Join', { location: 'navigation' })
              }}
            >
              Join Beta
            </CustomButton>
          </nav>
        </div>
      </Container>
    </header>
  )
}

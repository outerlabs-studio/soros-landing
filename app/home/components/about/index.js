'use client'

import { useRef } from 'react'
import {
  Bento,
  BentoCell,
  BentoContainer,
  Container,
  MediumPTextClass,
} from 'styles'
import DVDScreen from './dvd'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'
import { CustomHeading } from 'components'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export default function About() {
  const sectionEl = useRef(null)

  useGSAP(
    () => {
      let mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Remove negative margin top from SplitText
        const splitFirst = SplitText.create('.anim-text-1', {
          charsClass: 'block',
          linesClass: 'overflow-hidden',
        })
        const splitSecond = SplitText.create('.anim-text-2', {
          charsClass: 'block',
          linesClass: 'overflow-hidden',
        })
        gsap.set(splitFirst.words, { y: 0, autoAlpha: 1 })
        gsap.set(splitSecond.words, { y: 0, autoAlpha: 1 })
        // Remove negative margin top from section
        const section = document.getElementById('about-section')
        if (section) section.classList.remove('-mt-[100vh]')
        return () => {};
      })

      mm.add('not (prefers-reduced-motion: reduce)', () => {
        const splitFirst = SplitText.create('.anim-text-1', {
          charsClass: 'block',
          linesClass: 'overflow-hidden -mt-1',
        })
        const splitSecond = SplitText.create('.anim-text-2', {
          charsClass: 'block',
          linesClass: 'overflow-hidden -mt-1',
        })

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl.current,
            start: `top bottom`,
            end: `top+=${document.getElementsByClassName(`text-header`)[0].offsetHeight} center`,
            scrub: true,
            pinSpacing: false,
          },
        })

        master
          .from(
            splitFirst.words,
            {
              y: 130,
              duration: 2.5,
              stagger: 0.1,
              ease: 'power3.out',
              autoAlpha: 0,
            },
            0,
          )
          .from(
            splitSecond.words,
            {
              y: 130,
              duration: 1.5,
              stagger: 0.02,
              ease: 'power3.out',
              autoAlpha: 0,
            },
            0,
          )
      })
    },
    { dependencies: [sectionEl], scope: sectionEl },
  )

  return (
    <section
      ref={sectionEl}
      id="about-section"
      className="relative z-20 -mt-[100vh]"
    >
      <Container>
        <CustomHeading
          title={'The World’s First Decentralized Marketplace.'}
          description={
            "SOROS is the world’s first online marketplace that connects global crypto consumers with sellers, creating an easy, secure way to shop with crypto. Every store on our marketplace is carefully vetted, so you can buy with peace of mind, knowing you're dealing with trusted sellers."
          }
        />
      </Container>

      <BentoContainer>
        <Bento className={``}>
          <DVDScreen />

          <BentoCell className="px-5 py-10 md:px-[7.5vw] md:py-[6vw]">
            <p className={MediumPTextClass('text-gray-text')}>
              SOROS is a decentralized marketplace built for the future of
              shopping. No banks, no borders, no middlemen. Buyers can check out
              using <span className="text-white">any major cryptocurrency</span>
              , including Ethereum, Bitcoin, and Solana, making transactions
              fast, secure, and truly global. With blockchain at its core, SOROS
              empowers users to{' '}
              <span className="text-white">shop freely and transparently</span>,
              all while keeping full control of their wallets.
            </p>
          </BentoCell>
        </Bento>
      </BentoContainer>
    </section>
  )
}

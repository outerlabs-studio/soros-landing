'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'
import {
  AlmostDisplayTextClass,
  Bento,
  BentoCell,
  BentoContainer,
  Container,
  DisplayTextClass,
  MediumPTextClass,
  SmallPTextClass,
} from 'styles'
import Image from 'next/image'
import { CustomHeading } from 'components'

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText)

export default function Data() {
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
        const section = sectionEl.current
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
            start: `top-=10% bottom`,
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
    <section ref={sectionEl} className="relative -mt-[100vh]">
      <Container>
        <CustomHeading
          title={
            <>
              Your Wallet.
              <br />
              Your Data.
              <br />
              Your Rules.
            </>
          }
          description={
            'Security and privacy are at the core of SOROS. Every transaction is encrypted and processed directly on the blockchain, so your data stays safe and your wallet stays in your control. We never track, sell, or store personal information.'
          }
        />
      </Container>

      <BentoContainer>
        <Bento>
          <BentoCell className="px-5 py-10 md:px-[7.5vw] md:py-[6vw] gap-20 md:gap-[6vw]">
            <div className="flex flex-col items-center text-center">
              <p className={SmallPTextClass()}>SOROS has</p>
              <div>
                <p className={AlmostDisplayTextClass()}>
                  No{' '}
                  <span className={DisplayTextClass('text-light-purple')}>
                    KYC
                  </span>
                </p>
              </div>
              <p className={SmallPTextClass()}>
                verification. We’re crypto-based
                <br />
                from the beginning to the end.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className={SmallPTextClass()}>SOROS has</p>
              <div>
                <p className={AlmostDisplayTextClass()}>
                  No{' '}
                  <span className={DisplayTextClass('text-light-purple')}>
                    DATA
                  </span>
                </p>
              </div>
              <p className={SmallPTextClass()}>
                trackers. We don’t store or sell your
                <br />
                data. You’re always in control.
              </p>
            </div>
          </BentoCell>
          <BentoCell className="relative h-fit md:h-full px-5 py-10 md:px-[7.5vw] md:py-[6vw] gap-[6vw] justify-between">
            <p className={MediumPTextClass('text-gray-text')}>
              We use blockchain technology to record key transaction details
              without exposing any personal data.{' '}
              <span className="text-white">Every record is encrypted</span> and
              verified, ensuring both transparency and privacy. Your shopping
              history stays private, just the way it should be.
            </p>

            <div className="relative md:absolute bottom-0 w-full h-auto">
              <Image
                src={'/laptop.webp'}
                alt="SOROS Order Information Page"
                fill
                className="relative! w-full h-full object-contain"
                sizes={
                  '(min-width: 2120px) 996px, (min-width: 780px) calc(46.14vw + 30px), calc(100vw - 40px)'
                }
              />
            </div>
          </BentoCell>
        </Bento>
      </BentoContainer>
    </section>
  )
}

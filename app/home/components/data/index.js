'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'
import { Bento, BentoCell, BentoContainer, Container, Grid } from 'styles'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText)

export default function Data() {
  const sectionEl = useRef(null)

  useGSAP(
    () => {
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
          end: `top+=${document.getElementsByClassName(`text-header`)[0].offsetHeight} top`,
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
    },
    { dependencies: [sectionEl], scope: sectionEl },
  )

  return (
    <section ref={sectionEl} className="relative -mt-[100vh]">
      <Container>
        <Grid>
          <h2 className="anim-text-1 text-9xl font-medium col-start-1 col-end-13 mb-12">
            Your Wallet.
            <br />
            Your Data.
            <br />
            Your Rules.
          </h2>
          <p className="anim-text-2 text-3xl font-medium col-start-1 col-end-9 mb-28">
            Security and privacy are at the core of SOROS. Every transaction is
            encrypted and processed directly on the blockchain, so your data
            stays safe and your wallet stays in your control. We never track,
            sell, or store personal information.
          </p>
        </Grid>
      </Container>

      <BentoContainer>
        <Bento>
          <BentoCell className="px-[7.5vw] py-[6vw] gap-[6vw]">
            <div className="flex flex-col items-center text-center">
              <p className="text-xl font-medium leading-none">SOROS has</p>
              <div>
                <p className="text-7xl font-medium leading-none">
                  No <span className="text-9xl text-light-purple">KYC</span>
                </p>
              </div>
              <p className="text-xl font-medium leading-none">
                verification. We’re crypto-based
                <br />
                from the beginning to the end.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-xl font-medium leading-none">SOROS has</p>
              <div>
                <p className="text-7xl font-medium leading-none">
                  No <span className="text-9xl text-light-purple">Data</span>
                </p>
              </div>
              <p className="text-xl font-medium">
                trackers. We don’t store or sell your
                <br />
                data. You’re always in control.
              </p>
            </div>
          </BentoCell>
          <BentoCell className="relative px-[7.5vw] pt-[6vw] gap-[6vw] justify-between">
            <p className="text-2xl leading-tight text-gray-text font-medium">
              We use blockchain technology to record key transaction details
              without exposing any personal data.{' '}
              <span className="text-white">Every record is encrypted</span> and
              verified, ensuring both transparency and privacy. Your shopping
              history stays private, just the way it should be.
            </p>

            <div className="absolute bottom-0 w-full h-auto">
              <Image
                src={'/laptop.webp'}
                alt="SOROS Order Information Page"
                fill
                className="relative! w-full h-full object-contain"
              />
            </div>
          </BentoCell>
        </Bento>
      </BentoContainer>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { Container } from 'styles'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitText from 'gsap/dist/SplitText'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { Icons } from 'components'
import Form from './form'

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP)

export default function Hero() {
  const sectionEl = useRef(null)

  useGSAP(
    () => {
      // ——— 1) Intro animations ———
      const splitFirst = SplitText.create('.anim-text-1', {
        charsClass: 'block',
        linesClass: 'overflow-hidden -mt-10',
      })
      const splitSecond = SplitText.create('.anim-text-2', {
        charsClass: 'block',
        linesClass: 'overflow-hidden -mt-10',
      })

      gsap.from(splitFirst.words, {
        y: 130,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out',
      })
      gsap.from('.bracket', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      })

      const spinTween = gsap.to('.anim-icon', {
        rotation: 360,
        duration: 15,
        ease: 'linear',
        repeat: -1,
      })
      let resetTimeout

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl.current,
          start: 'top top',
          end: '+=3000',
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            clearTimeout(resetTimeout)
            const vel = self.getVelocity()
            const speed = gsap.utils.clamp(0.5, 5, Math.abs(vel) / 200)

            if (vel > 0.1) {
              gsap.to(spinTween, {
                timeScale: speed,
                duration: 0.3,
                ease: 'linear',
              })
            } else if (vel < -0.1) {
              gsap.to(spinTween, {
                timeScale: -speed,
                duration: 0.3,
                ease: 'linear',
              })
            }

            resetTimeout = window.setTimeout(() => {
              gsap.to(spinTween, {
                timeScale: 1,
                duration: 0.5,
                ease: 'linear',
              })
            }, 150)
          },
        },
      })

      tl.to('.anim-form', { autoAlpha: 0, duration: 1.5 }, 0)
        .to(
          splitFirst.words,
          {
            autoAlpha: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0,
        )
        .from(
          splitSecond.words,
          {
            yPercent: 100,
            duration: 2,
            stagger: 0.1,
            autoAlpha: 0,
            ease: 'power3.out',
          },
          1.5,
        )
        .to(
          splitSecond.words,
          {
            opacity: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: 'power3.out',
          },
          4,
        )
        .to(
          '.anim-icon',
          {
            scale: 0.1,
            duration: 12,
          },
          0,
        )
        .to(
          sectionEl.current,
          { autoAlpha: 0, duration: 4, ease: 'linear' },
          '<60%',
        )
        .from(document.getElementById('nav-logo'), {
          autoAlpha: 0,
          duration: 1,
        })
    },
    { dependencies: [sectionEl], scope: sectionEl },
  )

  return (
    <section
      ref={sectionEl}
      id="hero-section"
      className="relative h-dvh overflow-hidden z-5"
    >
      <div className="grid items-center justify-items-center grid-rows-3 absolute top-0 left-0 w-full h-full">
        <div />
        <div>
          <h1 className="anim-text-1 font-medium text-[8vw] text-center leading-tight text-white">
            The Future
            <br />
            of Shopping
            <br />
            is Crypto.
          </h1>
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 anim-text-2 font-medium text-[8vw] text-center leading-tight text-white">
            Pay Securely.
            <br />
            Shop Globally.
            <br />
            All in crypto.
          </h1>
        </div>
        <Form />
      </div>

      <div className="anim-icon pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[140vw] origin-center">
        <Icons className="w-full h-full" name="soros-icon" />
      </div>
    </section>
  )
}

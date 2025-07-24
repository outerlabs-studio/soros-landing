'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitText from 'gsap/dist/SplitText'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { CustomButton, Icons } from 'components'
import Form from './form'
import { DisplayTextClass, SmallPTextClass } from 'styles'

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP)

export default function Hero() {
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
        // Remove animation by setting elements to final state
        gsap.set(splitFirst.words, { y: 0, autoAlpha: 1 })
        gsap.set(splitSecond.words, { y: 0, autoAlpha: 0 })
        gsap.set('.anim-form', { autoAlpha: 1 })
        gsap.set('.anim-icon', { rotation: 0, scale: 1 })
        gsap.set(sectionEl.current, { autoAlpha: 1 })
        gsap.set(document.getElementById('nav'), { yPercent: 0 })
        gsap.set(document.getElementById('nav-logo'), { autoAlpha: 1 })
        return () => {}
      })

      mm.add('not (prefers-reduced-motion: reduce)', () => {
        const splitFirst = SplitText.create('.anim-text-1', {
          charsClass: 'block',
          linesClass: 'overflow-hidden -mt-2 sm:-mt-6 lg:-mt-10',
        })
        const splitSecond = SplitText.create('.anim-text-2', {
          charsClass: 'block',
          linesClass: 'overflow-hidden -mt-2 sm:-mt-6 lg:-mt-10',
        })

        const entry = gsap.timeline({ defaults: { delay: 0.5 } })

        entry
          .from(
            splitFirst.words,
            {
              y: 130,
              duration: 1.5,
              stagger: 0.1,
              ease: 'power3.out',
            },
            0,
          )
          .from(
            '.bracket',
            {
              scale: 0,
              opacity: 0,
              duration: 1,
              stagger: 0.1,
              ease: 'power3.out',
            },
            0,
          )
          .from(
            '.anim-form',
            { autoAlpha: 0, duration: 1, ease: 'power3.out' },
            0,
          )
          .from(
            document.getElementById('nav'),
            { yPercent: -100, duration: 1, ease: 'power3.out' },
            0,
          )

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

        tl.to('.anim-inner-form', { autoAlpha: 0, duration: 1.5 }, 0)
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
      })

      mm.add('(max-width: 640px)', () => {
        const nav = document.getElementById('nav')
        if (nav) {
          const mobileTl = gsap.timeline()
          mobileTl.from(nav, {
            autoAlpha: 0,
            duration: 1,
          })
        }
      })
    },
    { dependencies: [sectionEl], scope: sectionEl },
  )

  return (
    <section
      ref={sectionEl}
      id="hero-section"
      className="relative h-lvh h-max-unset! overflow-hidden z-5"
    >
      <div className="grid justify-items-center grid-rows-3 absolute top-0 left-0 w-full h-full">
        <div />
        <div className="self-center">
          <h1
            className={DisplayTextClass(
              'anim-text-1 text-center leading-tight text-white',
            )}
          >
            The Future
            <br />
            of Shopping
            <br />
            is Crypto
          </h1>
          <h1
            className={DisplayTextClass(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 anim-text-2 text-center leading-tight  text-white',
            )}
          >
            Shop
            <br />
            Globally
          </h1>
        </div>

        <Form />

        <div className="block sm:hidden anim-form">
          <div className="anim-inner-form flex flex-col items-center gap-4">
            <CustomButton
              primary
              href="/join"
              className={'anim-inner-form'}
              onClick={() => {
                track('Join', { location: 'navigation' })
              }}
            >
              Join Beta
            </CustomButton>

            <p className="text-xs font-medium text-gray-text">
              Scroll for more
            </p>
          </div>
        </div>
      </div>

      <div className="anim-icon pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 portrait:size-[300vw] portrait:sm:size-[220vw] size-[240vh] origin-center">
        <Icons className="w-full h-full" name="soros-icon" />
      </div>
    </section>
  )
}

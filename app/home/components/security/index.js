'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Icons, Marquee } from 'components'
import SplitText from 'gsap/dist/SplitText'
import { HugeTextClass } from 'styles'

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText)

const Security = () => {
  const sectionRef = useRef()

  const gridSize = 15
  const items = Array.from({ length: gridSize * gridSize })
  const itemRefs = useRef([])
  const gridRef = useRef()
  const securityWrapperRef = useRef()
  const marqueeWrapperRef = useRef()

  useGSAP(
    () => {
      const splitFirstText = SplitText.create('.anim-text', {
        charsClass: 'block',
        linesClass: 'overflow-hidden',
      })

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom+=4000 bottom',
          scrub: true,
          pin: sectionRef.current,
          immediateRender: false,
        },
      })

      const centerX = (gridSize - 1) / 2
      const centerY = (gridSize - 1) / 2
      const centerIndex = centerY * gridSize + centerX

      master
        .fromTo(itemRefs.current[centerIndex], { scale: 0 }, { scale: 1 }, 0)
        .from(
          splitFirstText.words,
          {
            yPercent: 100,
            duration: 0.4,
            stagger: 0.02,
            autoAlpha: 0,
            ease: 'power3.out',
          },
          0,
        )
        .fromTo(
          gridRef.current,
          { scale: 10 },
          { scale: 1, duration: 2.5 },
          '<55%',
        )
        .fromTo(
          securityWrapperRef.current,
          { backgroundColor: 'rgb(13, 13, 13)' },
          { backgroundColor: `rgb(88, 10, 206)` },
          '<',
        )
        .fromTo(
          itemRefs.current.filter((_, index) => index !== centerIndex),
          { scale: 0 },
          {
            scale: 1,
            duration: 1,
            stagger: {
              amount: 2,
              grid: [gridSize, gridSize],
              from: 'center',
            },
          },
          '<70%',
        )
        .to(sectionRef.current, { autoAlpha: 0 }, '<70%')
    },
    { dependencies: [sectionRef], scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-(--full-height) overflow-hidden -mt-[50vh]"
    >
      <div
        className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-10"
        ref={marqueeWrapperRef}
      >
        <Marquee repeat={10} duration={4}>
          <p className={HugeTextClass('anim-text mr-8')}>Security built in.</p>
        </Marquee>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden w-full h-full flex items-center justify-center"
        ref={securityWrapperRef}
      >
        <div
          ref={gridRef}
          className={`grid gap-4 items-center justify-items-center w-full h-full`}
          style={{ gridTemplateColumns: `repeat(${gridSize}, auto)` }}
        >
          {items.map((_, index) => {
            return (
              <Icons
                name="security"
                className="w-full h-full rotate-4"
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Security

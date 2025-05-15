'use client'

import { useRef } from 'react'
import { BigPTextClass, Container, Grid, SmallPTextClass } from 'styles'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import OffersSVG from './offers'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const Product = () => {
  const sectionRef = useRef()
  const paragraphRef = useRef([])

  useGSAP(
    () => {
      const splitFirstText = SplitText.create('.anim-text-1', {
        charsClass: 'block',
        linesClass: 'overflow-hidden -mt-1',
      })
      const splitSecondText = SplitText.create('.anim-text-2', {
        charsClass: 'block',
        linesClass: 'overflow-hidden -mt-1',
      })

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom+=6000 bottom',
          scrub: true,
          pin: sectionRef.current,
          immediateRender: false,
        },
      })

      function introZoom() {
        let tl = gsap.timeline()
        tl.fromTo('#List', { scale: 0 }, { scale: 2, duration: 1 })
          .from(
            '#profile1',
            { y: -400, opacity: 0, rotate: 30, duration: 0.7 },
            0,
          )
          .from(
            '#profile2',
            { y: -500, opacity: 0, rotate: 25, duration: 0.7 },
            0,
          )
          .from(
            '#profile3',
            { y: -600, opacity: 0, rotate: 20, duration: 0.7 },
            0,
          )
          .from(
            '#profile4',
            { y: -700, opacity: 0, rotate: 15, duration: 0.7 },
            0,
          )
        return tl
      }

      function scollThrough() {
        let tl = gsap.timeline()
        tl.to('#List', { yPercent: -100, duration: 1 })
        return tl
      }

      function exitZoom() {
        let tl = gsap.timeline()
        tl.to(
          gsap.utils.toArray([
            '#profile1',
            '#profile2',
            '#profile3',
            '#profile4',
          ]),
          { y: 0, duration: 0.7, stagger: 0.2 },
          0,
        )
          .to('#List', { yPercent: 0, scale: 1, duration: 1 }, '<')
          .to('#elements', { opacity: 1, duration: 0.4 }, '<0.2')
          .to(
            '#color_wrapper',
            { fill: 'rgba(18, 18, 18, 1)', duration: 0.6 },
            '<0.2',
          )
        return tl
      }

      master
        .set('#elements', { opacity: 0 })
        .to(sectionRef.current, { yPercent: 0 }, 0)
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
        .add(introZoom(), '<')
        .add(scollThrough(), '<80%')
        .fromTo(
          paragraphRef.current[0],
          { yPercent: 200 },
          { yPercent: -100, duration: 2 },
          0,
        )
        .to(
          splitFirstText.words,
          {
            duration: 0.4,
            stagger: 0.02,
            autoAlpha: 0,
            ease: 'power3.out',
          },
          '<70%',
        )
        .from(
          splitSecondText.words,
          {
            yPercent: 100,
            duration: 0.4,
            stagger: 0.02,
            autoAlpha: 0,
            ease: 'power3.out',
          },
          '<80%',
        )
        .fromTo(
          paragraphRef.current[1],
          { yPercent: 200 },
          { yPercent: -100, duration: 2 },
          '<',
        )
        .add(exitZoom(), '<10%')
        .to(
          splitSecondText.words,
          { duration: 0.4, stagger: 0.02, autoAlpha: 0, ease: 'power3.out' },
          '<70%',
        )
        .to(sectionRef.current, { opacity: 0, scale: 0.9 }, '<70%')
    },
    { dependencies: [sectionRef], scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="relative h-dvh -mt-[50vh] z-10">
      <Container>
        <Grid className="items-center justify-center">
          <div
            className="flex flex-col col-start-1 col-end-4"
            ref={(el) => paragraphRef.current.push(el)}
          >
            <h3 className={BigPTextClass('anim-text-1 text-white mb-5')}>
              Custom
              <br />
              Products
            </h3>
            <p className={SmallPTextClass('anim-text-1 text-gray-text')}>
              Send custom requests directly to verified sellers and get exactly
              what you’re looking for.
            </p>
          </div>

          <div className="relative flex items-center justify-center h-full col-start-4 col-end-10">
            <OffersSVG className="w-full" />
          </div>

          <div
            className="flex flex-col col-start-10 col-end-13"
            ref={(el) => paragraphRef.current.push(el)}
          >
            <h3 className={BigPTextClass('anim-text-2 text-white mb-5')}>
              Get Matched
              <br />
              With AI
            </h3>
            <p className={SmallPTextClass('anim-text-2 text-gray-text')}>
              SOROS AI intelligently matches your request with the best stores
              on the platform.
            </p>
          </div>
        </Grid>
      </Container>
    </section>
  )
}

export default Product

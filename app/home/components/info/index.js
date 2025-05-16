'use client'

import { CustomHeading, Marquee } from 'components'
import Image from 'next/image'
import {
  Bento,
  BentoCell,
  BentoContainer,
  BigTextClass,
  Container,
  HugeTextClass,
  SmallPTextClass,
} from 'styles'
import DVDScreen from './dvd'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const IMAGES = [
  {
    src: '/products/jewelry1.webp',
    alt: 'Watch',
  },
  {
    src: '/products/watch1.webp',
    alt: 'Watch',
  },
  {
    src: '/products/tech3.webp',
    alt: 'Watch',
  },
  {
    src: '/products/watch2.webp',
    alt: 'Watch',
  },
  {
    src: '/products/jewelry2.webp',
    alt: 'Watch',
  },
  {
    src: '/products/tech1.webp',
    alt: 'Watch',
  },
  {
    src: '/products/watch3.webp',
    alt: 'Watch',
  },
  {
    src: '/products/jewelry3.webp',
    alt: 'Watch',
  },
  {
    src: '/products/tech2.webp',
    alt: 'Watch',
  },
]

export default function Info() {
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
    },
    { dependencies: [sectionEl], scope: sectionEl },
  )

  useGSAP(
    () => {
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: '.anim-bars',
          start: `top bottom`,
          end: `bottom center+=25%`,
          pinSpacing: false,
          scrub: true,
        },
      })

      master
        .from(
          gsap.utils.toArray('.anim-bar'),
          {
            width: 0,
            duration: 2.5,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0,
        )
        .from(
          '.anim-bars p',
          {
            autoAlpha: 0,
            ease: 'power3.out',
            duration: 1,
          },
          '<50%',
        )
    },
    { dependencies: [sectionEl], scope: sectionEl },
  )

  return (
    <section
      id="info-section"
      className="relative z-10 -mt-[50vh]"
      ref={sectionEl}
    >
      <Container>
        <CustomHeading
          title={'Works Just Like Your Favorite Online Stores.'}
          description={
            'SOROS works just like your favorite online stores—browse products, add to cart, and check out in seconds. You get real-time order updates, verified sellers, and global shipping, all with the simplicity you’re used to—only smarter, safer, and built for the future.'
          }
        />
      </Container>

      <BentoContainer>
        <Bento>
          <BentoCell className="col-span-2 px-5 py-10 md:px-[7.5vw] md:py-[6vw]">
            <Marquee>
              {IMAGES.map((_, index) => (
                <div className="relative h-120 w-70 mr-5" key={index}>
                  <Image
                    className="object-contain"
                    src={_?.src}
                    alt={_?.alt}
                    fill
                  />
                </div>
              ))}
            </Marquee>
          </BentoCell>

          <BentoCell className="px-5 py-10 md:px-[7.5vw] md:py-[6vw]">
            <div className="relative w-120 h-40 mb-14">
              <Image
                className="object-contain"
                src="/reviews.webp"
                alt="SOROS Review System"
                fill
              />
            </div>
            <p className={SmallPTextClass('text-gray-text')}>
              <span className="text-white">
                Reviews hold every store accountable to the community.
              </span>{' '}
              Every review directly impacts a seller’s visibility on the
              platform, rewarding great service. This creates a transparent,
              trust-first environment where buyers know they’re dealing with
              real people, not anonymous foreign storefronts.
            </p>
          </BentoCell>
          <BentoCell className="px-5 py-10 md:px-[7.5vw] md:py-[6vw]">
            <div className="relative w-70 h-20 mb-14">
              <Image
                className="object-contain"
                src="/crypto.webp"
                alt="SOROS Crypto"
                fill
              />
            </div>
            <div>
              <h3 className={HugeTextClass('mb-8')}>
                Seamlessly Crypto.
                <br />
                Familiarly Shopping.
              </h3>
              <p className={SmallPTextClass('text-gray-text')}>
                <span className="text-white">
                  Crypto is built directly into the SOROS platform.
                </span>{' '}
                You can browse, shop, and check out using Ethereum, Bitcoin,
                Solana, and more. There are no extra steps or third-party tools.
                Payments are fast, secure, and happen entirely on the
                blockchain. It feels just like shopping anywhere else, but with
                more control and better technology.
              </p>
            </div>
          </BentoCell>

          <BentoCell className="grid grid-rows-[1fr_auto] col-start-2 row-start-2 row-span-2 overflow-hidden">
            <DVDScreen />

            <div className="px-5 py-10 md:px-[7.5vw] md:py-[6vw]">
              <h3 className={HugeTextClass('mb-8')}>
                Every Category
                <br />
                You Need.
              </h3>
              <p className={SmallPTextClass('text-gray-text')}>
                <span className="text-white">
                  SOROS has all the shopping categories you expect,
                </span>{' '}
                from fashion and electronics to home goods and collectibles.
                You’ll find the brands you know and love, along with new
                favorites waiting to be discovered. Everything is organized,
                easy to browse, and ready to ship. It’s a full shopping
                experience, just powered by crypto.
              </p>
            </div>
          </BentoCell>

          <BentoCell className="col-span-2 px-5 py-10 md:px-[7.5vw] md:py-[6vw] justify-start items-start">
            <p
              className={SmallPTextClass(
                'text-gray-text max-w-3/4 md:max-w-1/2',
              )}
            >
              <span className="text-white">
                SOROS keeps fees lower than anyone else.
              </span>{' '}
              With just a 3.5% fee, you get a better deal than the 7% or more
              charged by other crypto marketplaces. More value in every
              transaction. More power in your hands.
            </p>

            <div className="anim-bars grid grid-cols-[auto_1fr] grid-rows-2 items-center pt-10 md:pt-[6vw] gap-x-8 gap-y-4 w-full text-center">
              <p className={BigTextClass('text-white')}>3.5%</p>
              <div className="anim-bar rounded-xl flex items-center justify-center bg-linear-to-r from-light-purple to-purple py-5 md:px-6 md:py-10 w-[45%] md:w-[35%]">
                <p className={BigTextClass('text-white whitespace-nowrap')}>
                  SOROS Fee
                </p>
              </div>
              <p className={BigTextClass('text-gray-text')}>7%</p>
              <div className="anim-bar rounded-xl flex items-center justify-center bg-dark-gray py-5 md:px-6 md:py-10 w-full">
                <p className={BigTextClass('text-white whitespace-nowrap')}>
                  Others Fee
                </p>
              </div>
            </div>
          </BentoCell>
        </Bento>
      </BentoContainer>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import InertiaPlugin from 'gsap/dist/InertiaPlugin'

gsap.registerPlugin(InertiaPlugin)

export default function Side() {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      // ----- grid & physics settings -----
      const colors = { base: '#580ace', active: '#a267ff' }
      const threshold = 150
      const speedThreshold = 100
      const shockRadius = 250
      const shockPower = 5
      const maxSpeed = 5000
      const centerHole = true

      let dots = []
      let dotCenters = []

      function buildGrid() {
        container.innerHTML = ''
        dots = []
        dotCenters = []

        const style = getComputedStyle(container)
        const dotPx = parseFloat(style.fontSize)
        const gapPx = dotPx * 2
        const contW = container.clientWidth
        const contH = container.clientHeight
        const cols = Math.floor((contW + gapPx) / (dotPx + gapPx))
        const rows = Math.floor((contH + gapPx) / (dotPx + gapPx))
        const total = cols * rows

        for (let i = 0; i < total; i++) {
          const dot = document.createElement('div')
          dot.className =
            'relative w-[2vw] h-[2vw] rounded-full bg-light-purple origin-center will-change-transform translate-0 place-self-center'

          gsap.set(dot, { x: 0, y: 0, backgroundColor: colors.base })
          dot._inertiaApplied = false

          container.appendChild(dot)
          dots.push(dot)
        }

        // cache centers once the DOM is painted
        requestAnimationFrame(() => {
          dotCenters = dots
            .filter((d) => !d._isHole)
            .map((d) => {
              const r = d.getBoundingClientRect()
              return {
                el: d,
                x: r.left + window.scrollX + r.width / 2,
                y: r.top + window.scrollY + r.height / 2,
              }
            })
        })
      }

      // initial build + resize responsiveness
      buildGrid()
      window.addEventListener('resize', buildGrid)

      let lastTime = 0,
        lastX = 0,
        lastY = 0

      function handleMouseMove(e) {
        const now = performance.now()
        const dt = now - lastTime || 16
        let dx = e.pageX - lastX,
          dy = e.pageY - lastY
        let vx = (dx / dt) * 1000,
          vy = (dy / dt) * 1000
        let speed = Math.hypot(vx, vy)

        if (speed > maxSpeed) {
          const scale = maxSpeed / speed
          vx *= scale
          vy *= scale
          speed = maxSpeed
        }

        lastTime = now
        lastX = e.pageX
        lastY = e.pageY

        requestAnimationFrame(() => {
          dotCenters.forEach(({ el, x, y }) => {
            const dist = Math.hypot(x - e.pageX, y - e.pageY)
            const t = Math.max(0, 1 - dist / threshold)
            const col = gsap.utils.interpolate(colors.base, colors.active, t)
            gsap.set(el, { backgroundColor: col })

            if (
              speed > speedThreshold &&
              dist < threshold &&
              !el._inertiaApplied
            ) {
              el._inertiaApplied = true
              const pushX = x - e.pageX + vx * 0.005
              const pushY = y - e.pageY + vy * 0.005

              gsap.to(el, {
                inertia: { x: pushX, y: pushY, resistance: 750 },
                onComplete() {
                  gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 1.5,
                    ease: 'elastic.out(1,0.75)',
                  })
                  el._inertiaApplied = false
                },
              })
            }
          })
        })
      }

      function handleClick(e) {
        dotCenters.forEach(({ el, x, y }) => {
          const dist = Math.hypot(x - e.pageX, y - e.pageY)
          if (dist < shockRadius && !el._inertiaApplied) {
            el._inertiaApplied = true
            const falloff = Math.max(0, 1 - dist / shockRadius)
            const pushX = (x - e.pageX) * shockPower * falloff
            const pushY = (y - e.pageY) * shockPower * falloff

            gsap.to(el, {
              inertia: { x: pushX, y: pushY, resistance: 750 },
              onComplete() {
                gsap.to(el, {
                  x: 0,
                  y: 0,
                  duration: 1.5,
                  ease: 'elastic.out(1,0.75)',
                })
                el._inertiaApplied = false
              },
            })
          }
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('click', handleClick)

      // cleanup
      return () => {
        window.removeEventListener('resize', buildGrid)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('click', handleClick)
      }
    },
    { scope: containerRef },
  )

  return (
    <div className="hidden md:block fixed w-[40vw] min-h-(--full-height) top-0 left-0">
      <div
        ref={containerRef}
        className="flex absolute top-0 left-0 w-full h-full gap-[2vw] justify-center items-center pointer-events-none inset-0 grid-rows-[auto] grid-cols-1 auto-cols-[1fr]"
        style={{ flexFlow: 'wrap' }}
        id="dot-container"
      />
    </div>
  )
}

'use client'

import { useIntersectionObserver } from 'hooks'

const Marquee = ({
  children,
  repeat = 3,
  duration = 15,
  offset = 0,
  inverted = false,
  animationStart = true,
  ...props
}) => {
  const [setRef, intersection] = useIntersectionObserver()
  const isRunning = intersection?.isIntersecting && animationStart

  return (
    <div
      ref={setRef}
      {...props}
      className="relative flex items-center overflow-x-clip whitespace-nowrap"
      style={{
        '--duration': `${duration}s`,
        '--offset': `${offset % 100}%`,
      }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center whitespace-nowrap w-fit flex-shrink-0 will-change-transform ${inverted ? 'animate-marquee-inverted' : 'animate-marquee'}
          `}
          style={{ animationPlayState: isRunning ? 'running' : 'paused' }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export default Marquee

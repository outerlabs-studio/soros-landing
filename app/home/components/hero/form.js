'use client'

import { CustomButton } from 'components'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'

export default function Form({ onFocus, onBlur }) {
  const router = useRouter()
  const lenis = useLenis()
  const [isFocused, setIsFocused] = useState(false)

  // Lock/unlock scroll when input is focused
  useEffect(() => {
    if (isFocused) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
  }, [isFocused, lenis])

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  return (
    <form
      className={`md:self-center px-5 w-full max-w-100 anim-form ${isFocused ? 'input-focused' : ''}`}
      onSubmit={(e) => {
        e.preventDefault()

        router.push(`/join?email=${e.target.email.value}`)
      }}
    >
      <div className="flex flex-col items-center gap-3 w-full anim-inner-form">
        <div className="relative w-full">
          <input
            className="rounded-xl border-1 border-light-gray border-solid text-base outline-0 focus:border-light-gray placeholder:text-gray-text text-white py-3 px-5 w-full font-medium"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <CustomButton
            staticAnim
            className="absolute h-full right-0 top-1/2 -translate-y-1/2"
          >
            Join Waitlist
          </CustomButton>
        </div>
        <p className="text-xs font-medium text-gray-text">
          Over <span className="text-white">50,000</span> others have already
          joined
        </p>
      </div>
    </form>
  )
}

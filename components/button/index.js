'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function CustomButton({
  primary = false,
  secondary = primary === false ? true : false,
  disabled = false,
  href,
  ref,
  onClick,
  children,
  ...props
}) {
  const isExternal =
    href.startsWith('http') ||
    href.startsWith('mailto') ||
    href.startsWith('tel')

  const internalLinkProps = {
    ...props,
    target: isExternal ? '_blank' : undefined,
    rel: isExternal ? 'noopener noreferrer' : undefined,
  }

  return (
    <Link
      className={twMerge(
        'relative w-fit py-2 px-5 flex items-center justify-center gap-3 rounded-xl text-xs font-normal hover:-translate-y-1 transform transition-all duration-300 ease-in-out',
        secondary && 'bg-dark-gray text-white',
        primary && `bg-purple text-white`,
      )}
      ref={ref}
      onClick={(e) => {
        onClick?.(e)
      }}
      href={href}
      disabled={disabled}
      {...internalLinkProps}
    >
      {children}
    </Link>
  )
}

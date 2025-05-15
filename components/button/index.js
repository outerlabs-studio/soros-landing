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
  className,
  staticAnim,
  ...props
}) {
  const classes = twMerge(
    'relative w-fit py-2 px-5 flex items-center justify-center gap-3 rounded-xl text-base font-medium transform transition-all duration-300 ease-in-out hover:cursor-pointer',
    secondary && 'bg-dark-gray text-white',
    primary && `bg-purple text-white`,
    staticAnim ? `hover:opacity-80` : `hover:-translate-y-1`,
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  if (!href || typeof href !== 'string') {
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    )
  }

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
      className={classes}
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

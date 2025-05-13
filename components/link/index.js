'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function CustomLink({
  href,
  fallback = 'div',
  onClick,
  ref,
  classes,
  ...props
}) {
  if (!href || typeof href !== 'string') {
    const Tag = fallback

    return <Tag ref={ref} onClick={onClick} {...props} href={href} />
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
      ref={ref}
      onClick={(e) => {
        onClick?.(e)
      }}
      className={twMerge(
        "relative w-fit no-underline whitespace-nowrap cursor-pointer text-[inherit] before:absolute before:w-full before:h-[1px] before:bg-[currentColor] before:top-full before:left-0 before:pointer-events-none after:absolute after:w-full after:h-[1px] after:bg-[currentColor] after:top-full after:left-0 after:pointer-events-none before:content-[''] before:transition-transform before:ease-in-out before:duration-500 before:origin-[100% 50%] before:transform-[scale3d(0,1,1)] hover:before:origin-[0% 50%] hover:before:transform-[scale3d(1,1,1)]",
        classes,
      )}
      {...internalLinkProps}
      href={href}
    />
  )
}

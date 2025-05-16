import { twMerge } from 'tailwind-merge'

export function DisplayTextClass(className) {
  return twMerge(
    'text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none',
    className,
  )
}
export function AlmostDisplayTextClass(className) {
  return twMerge('text-6xl sm:text-8xl font-bold leading-none', className)
}
export function HugeTextClass(className) {
  return twMerge('text-4xl md:text-5xl leading-tight font-bold', className)
}
export function BigTextClass(className) {
  return twMerge('text-2xl md:text-3xl font-medium', className)
}
export const MediumPTextClass = (className) => {
  return twMerge(
    'text-lg md:text-xl lg:text-2xl leading-tight font-medium',
    className,
  )
}
export const SmallPTextClass = (className) => {
  return twMerge('text-lg md:text-xl leading-tight font-medium', className)
}

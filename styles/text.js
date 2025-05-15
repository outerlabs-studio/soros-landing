import { twMerge } from 'tailwind-merge'

export function DisplayTextClass(className) {
  return twMerge('text-9xl font-bold leading-none', className)
}
export function AlmostDisplayTextClass(className) {
  return twMerge('text-8xl font-bold leading-none', className)
}
export function HugeTextClass(className) {
  return twMerge('text-5xl leading-tight font-bold', className)
}
export function BigTextClass(className) {
  return twMerge('text-3xl text-white font-medium', className)
}
export const BigPTextClass = (className) => {
  return twMerge('text-3xl font-medium leading-tight', className)
}
export const MediumPTextClass = (className) => {
  return twMerge('text-2xl leading-tight font-medium', className)
}
export const SmallPTextClass = (className) => {
  return twMerge('text-xl leading-tight font-medium', className)
}

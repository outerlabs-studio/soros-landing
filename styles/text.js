import { twMerge } from 'tailwind-merge'

export function DisplayTextClass(className) {
  return twMerge('font-bold text-9xl leading-none', className)
}
export function HugeTextClass(className) {
  return twMerge('text-5xl leading-tight font-bold', className)
}
export function BigTextClass(className) {
  return twMerge('text-3xl text-white font-medium', className)
}
export const BigPTextClass = (className) => {
  twMerge('text-3xl font-medium leading-tight', className)
}
export const MediumPTextClass = (className) => {
  twMerge('text-2xl leading-tight font-medium', className)
}
export const SmallPTextClass = (className) => {
  return twMerge('text-xl leading-tight font-medium', className)
}

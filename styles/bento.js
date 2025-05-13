import { twMerge } from 'tailwind-merge'

export function BentoContainer(props) {
  return (
    <div
      className={twMerge(
        `overflow-hidden relative before:content-[''] before:border-t-1 before:border-solid before:border-light-gray before:absolute before:w-full after:content-[''] after:border-t-1 after:border-solid after:border-light-gray after:absolute after:w-full`,
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}
export function Bento(props) {
  return (
    <div
      className={twMerge(
        `bg-light-gray border-1 border-solid border-light-gray grid gap-[1px] grid-cols-2 justify-items-stretch w-full relative left-[-1px] mx-auto max-w-[2000px]`,
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}
export function BentoCell(props) {
  return (
    <div
      className={twMerge(
        `flex flex-col justify-center items-center bg-black relative overflow-hidden`,
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}

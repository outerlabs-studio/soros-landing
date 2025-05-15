import Image from 'next/image'
import { HugeTextClass, SmallPTextClass } from 'styles'
import { twMerge } from 'tailwind-merge'

export default function Card({ className, title, description, img }) {
  return (
    <div
      className={twMerge(
        `border-light-gray border-1 border-solid rounded-xl`,
        className,
      )}
    >
      <div
        className={`relative w-full h-120 overflow-hidden rounded-[inherit]`}
      >
        <Image
          className="w-full h-full object-cover"
          src={img?.src}
          alt={img?.alt}
          fill
        />
      </div>
      <div className="w-full px-8 py-8">
        <h3 className={HugeTextClass('mb-4')}>{title}</h3>
        <p className={SmallPTextClass()}>{description}</p>
      </div>
    </div>
  )
}

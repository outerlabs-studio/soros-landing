import { CustomButton, Input } from 'components'

export default function Form() {
  return (
    <form className="w-1/4 max-w-md anim-form">
      <div className="flex flex-col items-center gap-3 w-full anim-inner-form">
        <div className="relative w-full">
          <input
            className="rounded-xl border-1 border-light-gray border-solid text-base outline-0 focus:border-light-gray placeholder:text-gray-text text-white py-3 px-5 w-full font-medium"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
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

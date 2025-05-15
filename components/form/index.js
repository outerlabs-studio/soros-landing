import { twMerge } from 'tailwind-merge'

export function Input(props) {
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={props.id}
        className={twMerge(
          'text-base font-medium text-white mb-1',
          props.disabled && 'text-dark-gray',
        )}
      >
        {props.label}
      </label>
      <input
        className={twMerge(
          'rounded-xl border-1 border-light-gray border-solid text-base outline-0 focus:border-light-gray placeholder:text-gray-text text-white py-3 px-5 w-full font-medium',
          props.disabled && 'border-dark-gray text-dark-gray',
        )}
        disabled={props.disabled}
        {...props}
      />
    </div>
  )
}

import { ComponentProps, ReactNode } from "react"
import { VariantProps, tv } from "tailwind-variants"

const inputVariants = tv({
  base: "flex items-center justify-between px-4 h-16 rounded-2xl bg-secondary-dark",

  variants: {
    error: {
      true: 'border border-danger',
      false: 'border border-secondary-dark',
    },
    wide: {
      default: 'w-full sm:w-[328px] ',
      small: 'w-36',
      full: 'w-full'
    },
  },

  defaultVariants: {
    wide: 'default',
    error: false, 
  } 
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {
  children?: ReactNode
  text?: string
}

export const Input = ({
  children,
  text,
  wide,
  error,
  ...props
}: InputProps) => {

  text = text || 'left'

  return (
    <div className={inputVariants({ error, wide })}>
      <input {...props} className={`text-white bg-transparent py-4 flex-1 w-full focus:outline-none text-${text}`} />
      {children}
    </div>
  )
}
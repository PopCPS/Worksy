import { ComponentProps, ReactNode } from "react"
import { VariantProps, tv } from "tailwind-variants"

const inputVariants = tv({
  base: "flex items-center justify-between w-[328px] px-4 h-16 rounded-2xl bg-secondary-dark",

  variants: {
    error: {
      true: 'border border-danger',
      false: 'border border-secondary-dark',
    },
  },

  defaultVariants: {
    error: false,
  } 
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {
  children: ReactNode
}

export const Input = ({
  children,
  error,
  ...props
}: InputProps) => {
  return (
    <div className={inputVariants({ error })}>
      <input {...props} className="bg-transparent py-4 flex-1 focus:outline-none" />
      {children}
    </div>
  )
}
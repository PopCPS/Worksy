import { ComponentProps, ReactNode } from "react"
import { VariantProps, tv } from "tailwind-variants"

const buttonVariants = tv({
  base: 'flex justify-center items-center rounded-2xl text-2xl',

  variants: {
    width: {
      tiny: 'p-2',
      small: 'w-[140px] h-16',
      wide: 'w-64 h-16',
      full: 'w-full h-16'
    },
    variant: {
      primary: 'bg-primary text-secondary-def',
      secondary: 'bg-secondary-def text-white',
      secondaryDark: 'bg-secondary-dark text-white',
    }
  },

  defaultVariants: {
    width: 'full',
    variant: 'primary'
  } 
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export const Button = ({
  children,
  variant,
  width,
  ...props
}: ButtonProps) => {
  return (
    <button {...props} className={buttonVariants({ variant, width })}>
      {children}
    </button>
  )
}
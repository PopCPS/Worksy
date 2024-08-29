import { ComponentProps, ReactNode } from "react"

interface InputProps extends ComponentProps<'input'> {
  children: ReactNode
}

export const Input = ({
  children,
  ...props
}: InputProps) => {
  return (
    <div className="flex items-center justify-between w-[328px] h-16 p-4 rounded-2xl bg-secondary-dark">
      <input {...props} className="bg-transparent flex-1 focus:outline-none" />
      {children}
    </div>
  )
}
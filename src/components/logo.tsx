interface LogoProps {
  isPrimary: boolean
}

export const Logo = ({
  isPrimary
}: LogoProps) => {
  return (
    <div className="flex items-center justify-center select-none h-[150px] w-fit">
      {isPrimary ? (
        <img className="" src="/logo-primary.svg" alt="Logo Worksy" />
      ) : (
        <img className="" src="/logo-secondary.svg" alt="Logo Worksy" />
      )}
    </div>
  )
}
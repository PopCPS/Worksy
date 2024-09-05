import { X } from "lucide-react"
import { FormEvent, ReactNode } from "react"
import { Button } from "./button"

interface ModalProps {
  title: string
  children?: ReactNode
  closeModal: () => void,
  submit: (event: FormEvent<HTMLFormElement>) => void
}

export const Modal = ({
  title,
  children,
  closeModal,
  submit
}: ModalProps) => {
  return (
    <div className="inset-0 fixed flex items-center justify-center z-30 bg-secondary-def/60">
      <div className="w-[600px] p-4 rounded-2xl bg-primary">
        <div className="size-full space-y-2.5 p-4 rounded-2xl bg-secondary-def">
          <div className="flex justify-between">
            <span className="text-xl text-white">{title}</span>
            <button onClick={closeModal}>
              <X size={24} className="text-white" />
            </button>
          </div>
          <form onSubmit={event => submit(event)} className="flex flex-col gap-4">
            {children}
            <Button>
              Confirmar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
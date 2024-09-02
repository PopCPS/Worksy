import { Github, Linkedin, Plus } from "lucide-react"
import { Button } from "../../components/button"
import { Logo } from "../../components/logo"

export const Nav = () => {
  return (
    <nav className="flex flex-col w-[30%] items-center gap-6">
      <Logo isPrimary={false} />
      <div className="flex flex-col w-full h-full justify-between">
        <ul className="flex flex-col items-center text-xl w-full gap-4">
          <li className="w-full">
            <Button variant="secondary">
              Profissional
            </Button>
          </li>
          <li className="w-full">
            <Button variant="secondary">  
              Pessoal
            </Button>
          </li>
          <li className="flex items-center justify-center w-full">
            <Button variant="secondary" width="tiny">  
              <Plus />
            </Button>
          </li>
        </ul>
        <div className="space-y-5">
          <div className="flex justify-center gap-4">
            <a className="block size-fit p-2.5 rounded-[50%] bg-secondary-def" href="https://linkedin.com/in/artur-paz-sousa" target="blank">
              <Linkedin size={30} className="text-primary" />
            </a>
            <a className="block size-fit p-2.5 rounded-[50%] bg-secondary-def" href="https://github.com/PopCPS" target="blank">
              <Github size={30} className="text-primary" />
            </a>
          </div>
          <span className="block text-center">Desenvolvido por Artur Coelho</span>
        </div>
      </div>
    </nav>
  )
}
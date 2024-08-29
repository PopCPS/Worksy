import { CheckCircle2, Github, Linkedin, Plus, Search, User } from "lucide-react"
import { DatePicker } from "../../components/date-picker"
import { Button } from "../../components/button"
import { Logo } from "../../components/logo"

export const Home = () => {
  return (
    <div className="flex itesm justify-center h-screen w-screen p-6 bg-secondary-def">
      <div className="flex h-full w-[1440px] p-6 gap-6 rounded-2xl bg-primary">

        <nav className="flex flex-col w-[30%] items-center gap-6">
          <Logo isPrimary={false} />
          <div className="flex flex-col h-full justify-between">
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
              <span className="block">Desenvolvido por Artur Coelho</span>
            </div>
          </div>
        </nav>

        <div className="flex flex-col w-full space-y-5">

          <header className="flex justify-between px-5">

            <DatePicker></DatePicker>
          
            <button className="flex items-center justify-center size-[60px] rounded-[50%] bg-secondary-def">
              <User className="text-white" />
            </button>
          </header> 

          <main className="flex flex-col flex-1 w-full rounded-2xl p-6 gap-4 bg-secondary-def">

            <div className="flex justify-between">
              <button>
                <Plus size={40} strokeWidth={1} className="text-white" />
              </button>
              <div className="flex gap-4 rounded-2xl pl-5 bg-secondary-dark">
                <input 
                  className="text-white bg-transparent focus:outline-none" 
                  type="text" 
                  placeholder="buscar"
                />
                <button className="p-5">
                  <Search className="text-white" />
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-primary" />

            <div className="w-full">
              <div className="flex items-center justify-between px-5 w-full h-16 bg-primary rounded-2xl">
                <span className="text-2xl">
                  Tarefa
                </span>
                <div className="flex gap-4">
                  <span className="text-right">
                    12:00
                  </span>
                  <CheckCircle2 />
                </div>
              </div>  
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}
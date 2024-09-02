import { CheckCircle2, Plus, Search } from "lucide-react"

export const TaskSection = () => {
  return (
    <>
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
    </>
  )
}
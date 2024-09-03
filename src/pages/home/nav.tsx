import { Github, Linkedin, Plus } from "lucide-react"
import { Button } from "../../components/button"
import { Logo } from "../../components/logo"
import { useNavigate, useParams } from "react-router-dom"
import { FormEvent, useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { agendas } from "../../lib/global-states-interface"
import { Modal } from "../../components/modal"
import { Input } from "../../components/input"

export const Nav = () => {

  const navigate = useNavigate()
  const { agenda } = useParams()
  const [ agendas, setAgendas ] = useState<agendas[] | null>(null)
  const [ isNavModalOpen, setIsNavModalOpen ] = useState<boolean>(false)

  const [ title, setTitle ] = useState<string | null>(null)
  const [ titleError, setTitleError ] = useState(false)

  const closeAgendaModal = () => {
    setIsNavModalOpen(false)
  }

  const createAgenda = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let hasError = false
    if(!title) {
      setTitleError(true)
      hasError = true
    }
    if(hasError) {
      return
    }

    await api.post('/api/agenda', {
      title
    }, {
      withCredentials: true
    })

  }

  useEffect(() => {
    (async () => {
      await api.get('/api/agenda', {
        withCredentials: true
      }).then(response => {
        setAgendas(response.data) 
      }).catch(error => {
        if(error.status === 401) {
          navigate('/signin')
        }
      })
    })()
  }, [ agenda, navigate ])

  return (  
    <>
      <nav className="flex flex-col w-[30%] items-center gap-6">
        <Logo isPrimary={false} />
        <div className="flex flex-col w-full h-full justify-between">
          <ul className="flex flex-col items-center text-xl w-full gap-4">
            {agendas && agendas.map(instance => {

              const buttonColor = agenda == instance.id ? "secondaryDark" : "secondary"

              return (
                <li key={instance.id} className="w-full">
                  <Button 
                    variant={buttonColor}
                    onClick={() => navigate(`/${instance.id}`)}
                  >
                    {instance.name}
                  </Button>
                </li>
              )
            })}
            {agendas && agendas.length < 5 && (
              <li className="flex items-center justify-center w-full">
                <Button 
                  variant="secondary" 
                  width="tiny"
                  onClick={() => setIsNavModalOpen(true)}
                >  
                  <Plus />
                </Button>
              </li>
            )}
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

      {isNavModalOpen && (
        <Modal 
          title="Criar nova agenda"
          closeModal={closeAgendaModal}
          submit={createAgenda}
        >
          <Input 
            placeholder="Nome da agenda" 
            wide="full"
            error={titleError}
            onFocus={() => setTitleError(false)}
            onChange={event => setTitle(event.currentTarget.value)}
          />
        </Modal>
      )}
    </>
  )
}


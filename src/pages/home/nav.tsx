import { ChevronLeft, Github, Linkedin, Plus } from "lucide-react"
import { Button } from "../../components/button"
import { Logo } from "../../components/logo"
import { useNavigate, useParams } from "react-router-dom"
import { FormEvent, useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { agenda } from "../../lib/global-states-interface"
import { Modal } from "../../components/modal"
import { Input } from "../../components/input"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { set_agendas, set_isNavOpen } from "../../store/reducers/dataReducer"

export const Nav = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { agenda } = useParams()

  const isNavOpen = useAppSelector(state => state.apiData.isNavOpen)

  const [ agendas, setAgendas ] = useState<agenda[] | null>(null)
  const [ isNavModalOpen, setIsNavModalOpen ] = useState<boolean>(false)
  const [ title, setTitle ] = useState<string | null>(null)
  const [ titleError, setTitleError ] = useState(false)

  const closeAgendaModal = () => {
    setIsNavModalOpen(false)
  }

  const closeNav = () => {
    dispatch(set_isNavOpen(!isNavOpen))
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
    }).then(response => {
      dispatch(set_agendas(response.data.agendas))
      navigate(`/${response.data.id}`)
      closeAgendaModal()
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
      {(isNavOpen) && (
        <nav className="absolute w-8/12 border-r-2 border-secondary-def lg:static lg:border-none flex flex-col lg:w-[30%] items-center justify-center p-6 gap-6 z-40 lg:z-0 top-0 left-0 h-screen sm:h-full bg-primary">
          <Logo isPrimary={false} />
          <div className="flex flex-col w-full flex-1 justify-between">
            <ul className="relative flex flex-col justify-center items-center text-xl w-full gap-4">
              <button onClick={closeNav} className="absolute py-2 -right-[66px] rounded-r-2xl border-2 border-l-0 border-secondary-def z-30 bg-primary lg:hidden">
                <ChevronLeft size={40} className="text-secondary-def" />
              </button>
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
              <span className="hidden sm:block text-center">Desenvolvido por Artur Coelho</span>
            </div>
          </div>
        </nav>
      )}

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


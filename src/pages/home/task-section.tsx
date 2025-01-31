import { CheckCircle2, Circle, CircleX, LoaderCircleIcon, Pencil, Plus, Search, Trash2 } from "lucide-react"
import { useState, FormEvent, useEffect } from "react"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useNavigate, useParams } from "react-router-dom"
import { activities } from "../../lib/global-states-interface"
import dayjs from "dayjs"
import { set_agendas } from "../../store/reducers/dataReducer"

export const TaskSection = () => {

  const { agenda } = useParams()
  const dispatch = useAppDispatch() 
  const navigate = useNavigate()

  const [ reload, setReload ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  const [ isNewTaskModalOpen, setIsNewTaskModalOpen ] = useState(false)
  const [ isEditActivityModalOpen, setIsEditActivityModalOpen ] = useState(false)
  const [ isDeleteAgendaModalOpen, setIsDeleteAgendaModalOpen ] = useState(false)
  const [ isDeleteActivityModalOpen, setIsDeleteActivityModalOpen ] = useState(false)

  const [ activity, setActivity ] = useState<activities | null>(null)
  const [ selectedAgendaId, setSelectedAgendaId ] = useState<string | undefined>(agenda)
  const [ title, setTitle ] = useState<string | null>(null)
  const [ hour, setHour ] = useState<string | null>(null)
  const [ search, setSearch ] = useState<string | null>(null)

  const [ titleError, setTitleError ] = useState(false)
  const [ hourError, setHourError ] = useState(false)

  const [ activities, setActivities ] = useState<activities[] | null>(null)

  const day = useAppSelector(state => state.apiData.day)
  const month = useAppSelector(state => state.apiData.month)
  const year = new Date().getFullYear()
  const agendas = useAppSelector(state => state.apiData.agendas)

  const closeNewTaskModal = () => {
    setIsNewTaskModalOpen(false)
  }

  const closeEditActivityModal = () => {
    setIsEditActivityModalOpen(false)
  }

  const closeDeleteAgendaModal = () => {
    setIsDeleteAgendaModalOpen(false)
  }

  const closeDeleteActivityModal = () => {
    setIsDeleteActivityModalOpen(false)
  }

  const formatDate = (year: number, month: number, day: number) => {
    const monthString = month > 9 ? month.toString() : '0'.concat(month.toString())
    const dayString = day > 9 ? day.toString() : '0'.concat(day.toString())
    return `${year}-${monthString}-${dayString}`
  }

  const createActivity = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let hasError = false

    if(!hour) {
      setHourError(true)
      hasError = true
    }
    if(!title) {
      setTitleError(true)
      hasError = true
    }
    if(title && title.length < 3) {
      setTitleError(true)
      hasError = true
    }
    if(hasError) {
      return
    }

    setIsLoading(true)

    await api.post('/api/activities', {
      title,
      agenda: selectedAgendaId,
      occurs_at: `${formatDate(year, month, day)}T${hour}`
    }, {
      withCredentials: true
    }).then(() => {
      setReload(!reload)
      setIsLoading(false)
      setIsNewTaskModalOpen(false)
    })

  }

  const deleteAgenda = async (agendaId: string, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    await api.delete(`/api/agenda/${agendaId}`, {
      withCredentials: true,
    }).then(response => {
      setIsDeleteAgendaModalOpen(false)
      console.log(response.data)
      dispatch(set_agendas(response.data))
      sessionStorage.setItem('agendas', JSON.stringify(response.data))
      setIsLoading(false)
      navigate(`/${response.data[0].id}`)
    })
  }

  const deleteActivity = async (activityId: string, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    await api.delete(`/api/activities/${activityId}`, {
      withCredentials: true,
    }).then(() => {
      setReload(!reload)
      setIsDeleteActivityModalOpen(false)
      setIsLoading(false)
    })
  }

  const handleIsActivityDone = async (activityId: string, is_done: boolean) => {
    await api.patch('/api/activities', {
        activity_id: activityId,
        title: undefined,
        is_done: !is_done,
        date: undefined,
        occurs_at: undefined,
    }, {
      withCredentials: true,
    }).then(() => {
      setReload(!reload)
    })
  }

  const patchActivity = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setTitle(null)
    setHour(null)
    if(activity) {
      await api.patch('/api/activities', {
        activity_id: activity.id,
        title: title || activity.title,
        is_done: activity.is_done,
        date: undefined,
        occurs_at: `${activity.date}T${hour ? hour : dayjs(activity.occurs_at).format('HH:mm')}`,
      }).then(() => {
        setReload(!reload)
        setIsLoading(false)
        setIsEditActivityModalOpen(false)
      })
    }
  }

  useEffect(() => {
    if(!search) {
      (async () => {
        await api.get(`/api/activities/${agenda}/${formatDate(year, month, day)}`, {
          withCredentials: true
        }).then(response => {
          setActivities(response.data)
        })
      })()
    } else {
      (async () => {
        await api.get(`/api/activities/${agenda}/${formatDate(year, month, day)}/${search}`, {
          withCredentials: true
        }).then(response => {
          setActivities(response.data)
        })
      })()
    }
  }, [ agenda, day, month, year, reload, search ])

  return (
    <>
      {isLoading && (
        <div className="inset-0 fixed z-50 flex items-center justify-center bg-secondary-dark/60">
          <LoaderCircleIcon size={60} className="animate-spin text-primary" />
        </div>
      )}
      <div className="flex flex-col max-h-screen justify-between gap-x-4 gap-y-2 sm:flex-row">
        <div className="flex flex-1 justify-between">
          <button>
            <Plus 
              size={40} 
              strokeWidth={1} 
              className="text-white" 
              onClick={() => {
                setSelectedAgendaId(agenda)
                setIsNewTaskModalOpen(true)
              }}
            />
          </button>
          {agendas && agendas.length > 1 && (
            <button onClick={() => setIsDeleteAgendaModalOpen(true)}>
              <Trash2 className="text-danger" />
            </button>
          )}
        </div>
        <Input 
          placeholder="Buscar"
          onChange={e => setSearch(e.currentTarget.value)}
        >
          <Search className="text-white" />
        </Input>
      </div>

      <div className="h-px w-full bg-primary" />

      <div className="flex flex-col justify-center gap-y-4 overflow-x-hidden pr-2 overflow-y-scroll">
        {activities && activities.length > 0 ? activities.map(activity => {
            return (
            <div key={activity.id} className="w-full group">
              <div className="flex flex-col items-center justify-between p-5 w-full bg-primary rounded-2xl sm:flex-row sm:px-5">
                <span className="block w-full text-2xl self-start truncate">
                  {activity.title}
                </span>
                <div className="flex gap-4 justify-between w-full transition-all sm:w-auto">
                  <button onClick={() => {
                    setIsEditActivityModalOpen(true)
                    setActivity(activity)
                  }}>
                    <Pencil className="transition ease-in-out group-hover:visible group-hover:scale-100 focus:outline-none text-secondary-dark sm:invisible sm:scale-0" />
                  </button>
                  <button onClick={() => {
                    setIsDeleteActivityModalOpen(true)
                    setActivity(activity)
                  }}>
                    <Trash2 className="transition ease-in-out group-hover:visible group-hover:scale-100 focus:outline-none text-danger sm:invisible sm:scale-0" />
                  </button>
                  <span className="text-right -order-1 sm:order-none">
                    {dayjs(activity.occurs_at).format('HH:mm')}
                  </span>
                  <button onClick={() => handleIsActivityDone(activity.id, activity.is_done)}>
                    {activity.is_done ? (
                      <CheckCircle2 className="text-success" />
                    ) : dayjs().isBefore(activity.occurs_at) ? (
                      <Circle className="text-secondary-dark" />
                    ): (
                      <CircleX className="text-danger" />
                    )}
                  </button>
                </div>
              </div>  
            </div>
          )
        }) : (
          <div className="size-full flex items-center justify-center">
            <h1 className="text-2xl font-bold text-white">Nada por aqui</h1>
          </div>
        )}
      </div>

      {isEditActivityModalOpen && activity && (
        <Modal 
          title="Editar atividade"
          submit={(e) => patchActivity(e)}
          closeModal={closeEditActivityModal}
        >
          <div className="flex gap-2">
            <Input 
              wide="full"
              placeholder={activity.title} 
              onChange={event => setTitle(event.currentTarget.value)} 
            />
            <Input  
                  type="time" 
                  placeholder="00:00" 
                  wide={'small'} 
                  text="center" 
                  maxLength={5} 
                  error={hourError}
                  onChange={event => setHour(event.target.value)}
                  onFocus={() => setHourError(false)}
                />     
          </div>    
        </Modal>
      )}

      {isNewTaskModalOpen && (
        <Modal 
          title="Criar atividade"
          closeModal={closeNewTaskModal}
          submit={createActivity}
        >
          <div className="flex flex-col gap-2">
            <Input 
              placeholder="Nome da atividade" 
              wide={'full'} 
              error={titleError}
              onChange={event => setTitle(event.target.value)}
              onFocus={() => setTitleError(false)}
            />
            <div className="flex gap-2">
              <div className="w-full rounded-2xl px-4 bg-secondary-dark">
                <select 
                  name="agenda" 
                  id="agenda"
                  className={`${hourError ? 'border-danger' : 'border-secondary-dark'} size-full text-white bg-secondary-dark focus:outline-none`}
                  onChange={event => setSelectedAgendaId(event.target.value)} 
                >
                  {agendas && Object.values(agendas).map(agendaInstance => {
                    if(agenda == agendaInstance.id) {
                      return (
                        <option selected key={agendaInstance.id} value={agendaInstance.id}>{agendaInstance.name}</option>
                      )
                    } else {
                      return (
                        <option key={agendaInstance.id} value={agendaInstance.id}>{agendaInstance.name}</option>
                      )
                    }
                  })}
                </select>
              </div>
              <Input 
                type="time" 
                placeholder="00:00" 
                wide={'small'} 
                text="center" 
                maxLength={5} 
                error={hourError}
                onChange={event => setHour(event.target.value)}
                onFocus={() => setHourError(false)}
              />
            </div> 
          </div>

        </Modal>
      )}

      {isDeleteActivityModalOpen && activity  && (
        <Modal 
          title={`Tem certeza que quer apagar a atividade ${activity?.title}?`}
          closeModal={closeDeleteActivityModal}
          submit={(e) => deleteActivity(activity.id, e)}
        >
        </Modal>
      )}

      {isDeleteAgendaModalOpen && agenda && (
        <Modal
          title={`Tem certeza que quer apagar esta agenda?`}
          closeModal={closeDeleteAgendaModal}
          submit={(e) => deleteAgenda(agenda, e)}
        >
        </Modal>
      )}
    </>
  )
}
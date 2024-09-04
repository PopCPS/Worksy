import { CheckCircle2, Circle, CircleX, Ellipsis, Plus, Search } from "lucide-react"
import { useState, FormEvent, useEffect } from "react"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"
import { useAppSelector } from "../../store/hooks"
import { useParams } from "react-router-dom"
import { activities } from "../../lib/global-states-interface"
import dayjs from "dayjs"

export const TaskSection = () => {

  const { agenda } = useParams()
  const [ isNewTaskModalOpen, setIsNewTaskModalOpen ] = useState(false)
  const [ selectedAgendaId, setSelectedAgendaId ] = useState<string | null>(null)
  const [ title, setTitle ] = useState<string | null>(null)
  const [ hour, setHour ] = useState<string | null>(null)
  const [ titleError, setTitleError ] = useState(false)
  const [ hourError, setHourError ] = useState(false)
  const [ activities, setActivities ] = useState<activities[] | null>(null)

  const day = useAppSelector(state => state.apiData.day)
  const month = useAppSelector(state => state.apiData.month)
  const year = new Date().getFullYear()
  const agendas = useAppSelector(state => state.apiData.agendas)
  let hasError = false

  const closeNewTaskModal = () => {
    setIsNewTaskModalOpen(false)
  }

  const formatDate = (year: number, month: number, day: number) => {
    const monthString = month > 9 ? month.toString() : '0'.concat(month.toString())
    const dayString = day > 9 ? day.toString() : '0'.concat(day.toString())
    return `${year}-${monthString}-${dayString}`
  }

  const createActivity = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    hasError = false

    if(!hour) {
      setHourError(true)
      hasError = true
    }
    if(!title) {
      setTitleError(true)
      hasError = true
    }
    if(hasError) {
      return
    }

    await api.post('/api/activities', {
      title,
      agenda: selectedAgendaId,
      occurs_at: `${formatDate(year, month, day)}T${hour}`
    }, {
      withCredentials: true
    })
  }

  useEffect(() => {
    (async () => {
      await api.get(`/api/activities/${agenda}/${formatDate(year, month, day)}`, {
        withCredentials: true
      }).then(response => {
        setActivities(response.data)
      })
    })()
  }, [ agenda, day, month, year ])

  return (
    <>
      <div className="flex justify-between">
        <button>
          <Plus 
            size={40} 
            strokeWidth={1} 
            className="text-white" 
            onClick={() => setIsNewTaskModalOpen(true)}
          />
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

      {activities && activities.length>0 ? activities.map(activity => {
        return (
          <div key={activity.id} className="w-full group">
            <div className="flex items-center justify-between px-5 w-full h-16 bg-primary rounded-2xl">
              <span className="text-2xl">
                {activity.title}
              </span>
              <div className="flex gap-4">
                <span className="text-right">
                  {dayjs(activity.occurs_at).format('HH:mm')}
                </span>
                <button className="hidden  transition-all group-hover:block">
                  <Ellipsis />
                </button>
                {activity.isDone ? (
                  <CheckCircle2 className="text-success" />
                ) : dayjs().isBefore(activity.occurs_at) ? (
                  <Circle className="text-secondary-dark" />
                ): (
                  <CircleX className="text-danger" />
                )}
              </div>
            </div>  
          </div>
        )
      }) : (
        <div className="size-full flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white">Parace que sua agenda está livre para hoje!</h1>
        </div>
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
                  {agendas && Object.values(agendas).map(agenda => {
                    return (
                      <option key={agenda.id} value={agenda.id}>{agenda.name}</option>
                    )
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
    </>
  )
}
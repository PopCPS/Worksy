export interface IStates {
  day: number,
  month: number,
  agendas: agendas | null
}

export interface agendas {
    id: string,
    user_id: string,
    name: string
}

export interface user {
  id: string,
  name: string,
  email: string,
  image: string,
  agenda: agendas[]
  activity: activities[]
}

export interface activities {
  id: string,
  agenda_id: string,
  user_id: string,
  title: string,
  date: string,
  is_done: boolean,
  occurs_at: string,
  user: user
  agenda: agendas
}
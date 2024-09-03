import { useState } from "react"
import { Header } from "./header"
import { Nav } from "./nav"
import { TaskSection } from "./task-section"
import { api } from "../../lib/axios"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../store/hooks"
import { set_agendas } from "../../store/reducers/dataReducer"

export const Home = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  if(sessionStorage.getItem('agendas')){
    dispatch(set_agendas(JSON.parse(sessionStorage.getItem("agendas"))))
  }

  useState(async () => {
    await api.post(
      '/api/ping',
      {},
      {
        withCredentials: true
      }
    ).catch(response => {
      if(response.status === 401) {
        navigate('/signin')
      }
    })
  })

  return (
    <>
      <div className="flex itesm justify-center h-screen w-screen p-6 bg-secondary-def">
        <div className="flex h-full w-[1440px] p-6 gap-6 rounded-2xl bg-primary">
          
          <Nav />

          <div className="flex flex-col w-full space-y-5">

            <Header />

            <main className="flex flex-col flex-1 w-full rounded-2xl p-6 gap-4 bg-secondary-def">

              <TaskSection />

            </main>
          </div>
        </div>
      </div>
    </>
  )
}
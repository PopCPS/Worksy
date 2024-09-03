import { useState } from "react"
import { Logo } from "../../components/logo"
import { useNavigate } from "react-router-dom"
import { api } from "../../lib/axios"

export const Redirect = () => {
  const navigate = useNavigate()

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
    <div className="flex justify-center items-center h-screen w-screen">
      <Logo isPrimary={true} />
    </div>
  )
}
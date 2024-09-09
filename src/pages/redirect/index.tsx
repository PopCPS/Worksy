import { useState } from "react"
import { Logo } from "../../components/logo"
import { useNavigate } from "react-router-dom"
import { api } from "../../lib/axios"
import { Loader2Icon } from "lucide-react"

export const Redirect = () => {
  const navigate = useNavigate()

  const [ isLoading, setIsLoading ] = useState(false)

  useState(async () => {
    setIsLoading(true)
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
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary-def/60" >
          <Loader2Icon size={40} className="animate-spin text-secondary-def" />
        </div>
      )}
      <div className="flex justify-center items-center h-screen w-screen">
        <Logo isPrimary={true} />
      </div>
    </>
  )
}
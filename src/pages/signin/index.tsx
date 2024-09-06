import { LoaderCircle, Lock, Mail } from "lucide-react"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Logo } from "../../components/logo"
import { useNavigate } from "react-router-dom"
import { FormEvent, useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { useAppDispatch } from "../../store/hooks"
import { set_agendas } from "../../store/reducers/dataReducer"
import { agenda } from "../../lib/global-states-interface"
import axios, { AxiosError } from "axios"

export const Signin = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null)

  const [ loginData, setLoginData ] = useState<agenda[] | null>(null)
  const [ email, setEmail ] = useState<string | null>(null)
  const [ password, setPassword ] = useState<string | null>(null)
  const [ isEmailError, setIsEmailError ] = useState<boolean>(false)
  const [ isPasswordError, setIsPasswordError ] = useState<boolean>(false)

  let isFormError = false

  const navToSignup = () => {
    navigate('/signup')
  }

  const signin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    isFormError = false
    setIsLoading(true)
    
    if(!email) {
      setIsEmailError(true)
      isFormError = true
    }
    if(!password) {
      setIsPasswordError(true)
      isFormError = true
    }

    if(isFormError) {
      setIsLoading(false)
      return
    }

    await api.post('/api/login', {
      email,
      password  
    }).then(response => {
      setLoginData(response.data.agendas)
    }).catch((error: Error | AxiosError) => {
      setIsLoading(false)
      if (axios.isAxiosError(error))  {
        setErrorMessage(error.response?.data.error) 
      }
    })
  }

  useEffect(() => {
    if(loginData){
      console.log(loginData)
      dispatch(set_agendas(loginData))
      sessionStorage.setItem('agendas', JSON.stringify(loginData))
      setIsLoading(false)
      navigate(`/${loginData[0].id}`)
    }
  }, [ loginData, navigate, dispatch ])

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-primary sm:bg-secondary-def">
      <div className="sm:h-[660px] sm:w-[392px] sm:p-4 rounded-2xl bg-primary">
        <div className="relative flex flex-col justify-center items-center gap-10 h-full w-full rounded-2xl p-4 bg-secondary-def">

        {isLoading && (
          <div className="absolute flex items-center justify-center size-full rounded-2xl bg-secondary-dark/60">
            <LoaderCircle size={40} className="animate-spin text-primary" />
          </div>
        )}

          <Logo isPrimary={true} />
          <form onSubmit={e => signin(e)} className="flex flex-col items-center justify-center gap-6">
            <div className="space-y-2.5 text-white">
              {errorMessage && (
                <div className="flex justify-center">
                  <span className="text-center text-danger">{errorMessage}</span>
                </div>
              )}
              <Input 
                onChange={e => setEmail(e.currentTarget.value)} 
                onFocus={() => setIsEmailError(false)}
                error={isEmailError} 
                type="email" 
                placeholder="E-mail"
              >
                <Mail className="text-white" />
              </Input>
              <Input 
                onChange={e => setPassword(e.currentTarget.value)} 
                onFocus={() => setIsPasswordError(false)}
                error={isPasswordError} 
                type="password" 
                placeholder="Senha"
              >
                <Lock className="text-white" />
              </Input>
            </div>
            <div className="flex gap-2"> 
              <Button width="small">
                Login
              </Button>
              <Button onClick={navToSignup} type="button" variant="secondaryDark" width="small">
                Cadastro
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>  
  )
}
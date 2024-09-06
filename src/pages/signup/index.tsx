import { LoaderCircle, Lock, Mail, User } from "lucide-react"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Logo } from "../../components/logo"
import { useNavigate } from "react-router-dom"
import { FormEvent, useEffect, useState } from "react"
import { agenda } from "../../lib/global-states-interface"
import { useAppDispatch } from "../../store/hooks"
import { api } from "../../lib/axios"
import { set_agendas } from "../../store/reducers/dataReducer"
import axios, { AxiosError } from "axios"

export const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [ loginData, setLoginData ] = useState<agenda[] | null>(null)

  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null)

  const [ name, setName ] = useState<string | null>(null)
  const [ email, setEmail ] = useState<string | null>(null)
  const [ password, setPassword ] = useState<string | null>(null)
  const [ confirmPassword, setConfirmPassword ] = useState<string | null>(null)

  const [ isNameError, setIsNameError ] = useState<boolean>(false)
  const [ isEmailError, setIsEmailError ] = useState<boolean>(false)
  const [ isPasswordError, setIsPasswordError ] = useState<boolean>(false)
  const [ isConfirmPasswordError, setIsConfirmPasswordError ] = useState<boolean>(false)

  let hasError = false

  const navToSignin = () => {
    navigate('/signin')
  }

  const signup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    hasError = false
    setIsLoading(true)

    if(!name) {
      setIsNameError(true)
      setErrorMessage('Todos os campos devem ser preenchidos')
      hasError = true
    }
    if(name && name.length < 4){
      setIsNameError(true)
      setErrorMessage('Nome de usuário deve ter no mínimo 4 caracteres')
      hasError = true
    }
    if(!email) {
      setIsEmailError(true)
      setErrorMessage('Todos os campos devem ser preenchidos')
      hasError = true
    }
    if(!password) {
      setIsPasswordError(true)
      setErrorMessage('Todos os campos devem ser preenchidos')
      hasError = true
    }
    if(password && password.length < 8) {
      setIsPasswordError(true)
      setErrorMessage('Senha deve ter no mínimo 8 caracteres')
      hasError = true
    }
    if(!confirmPassword) {
      setIsConfirmPasswordError(true)
      setErrorMessage('Todos os campos devem ser preenchidos')
      hasError = true
    }
    if(password !== confirmPassword) {
      setIsPasswordError(true)
      setIsConfirmPasswordError(true)
      setErrorMessage('Senhas não são iguais')
      hasError = true
    }

    if(hasError) {
      setIsLoading(false)
      return
    }

    console.log({ name, email, password, confirmPassword})

    await api.post('/api/register', {
      name,
      email,
      password,
      confirmPassword
    }).catch((error: Error | AxiosError) => {
      setIsLoading(false)
      if (axios.isAxiosError(error))  {
        setErrorMessage(error.response?.data.error) 
      }
      return
    })

    await api.post('/api/login', {
      email,
      password  
    }).then(response => {
      setLoginData(response.data.agendas)
      console.log('login')
    }).catch((error: Error | AxiosError) => {
      setIsLoading(false)
      if (axios.isAxiosError(error))  {
        setErrorMessage(error.response?.data.error) 
      }
    })
  }

  useEffect(() => {
    if(loginData){
      dispatch(set_agendas(loginData))
      sessionStorage.setItem('agendas', JSON.stringify(loginData))
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
          <form 
            onSubmit={e => signup(e)}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="space-y-2.5 text-white">
              {errorMessage && (
                <div className="flex justify-center">
                  <span className="text-center text-danger">{errorMessage}</span>
                </div>
              )}
              <Input 
                error={isNameError} 
                onChange={e => setName(e.currentTarget.value)}
                onFocus={() => setIsNameError(false)}
                placeholder="Nome de usuário"
              >
                <User className="text-white" />
              </Input>
              <Input 
                error={isEmailError}
                onChange={e => setEmail(e.currentTarget.value)}
                onFocus={() => setIsEmailError(false)}
                type="email" 
                placeholder="E-mail"
              >
                <Mail className="text-white" />
              </Input>
              <Input 
                error={isPasswordError}
                onChange={e => setPassword(e.currentTarget.value)}
                onFocus={() => setIsPasswordError(false)}
                type="password" 
                placeholder="Senha"
              >
                <Lock className="text-white" />
              </Input>
              <Input
                error={isConfirmPasswordError}
                onChange={e => setConfirmPassword(e.currentTarget.value)} 
                onFocus={() => setIsConfirmPasswordError(false)}
                type="password" 
                placeholder="Confirme sua Senha"
              >
                <Lock className="text-white" />
              </Input>
            </div>
            <div className="flex gap-2"> 
              <Button width="small">
                Cadastro
              </Button>
              <Button type="button" onClick={navToSignin} variant="secondaryDark" width="small">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>  
  )
}
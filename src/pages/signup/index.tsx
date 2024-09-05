import { Lock, Mail, User } from "lucide-react"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Logo } from "../../components/logo"
import { useNavigate } from "react-router-dom"
import { FormEvent, useEffect, useState } from "react"
import { agenda } from "../../lib/global-states-interface"
import { useAppDispatch } from "../../store/hooks"
import { api } from "../../lib/axios"
import { set_agendas } from "../../store/reducers/dataReducer"

export const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [ loginData, setLoginData ] = useState<agenda[] | null>(null)

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
    if(!name) {
      setIsNameError(true)
      hasError = true
    }
    if(name && name.length < 4){
      setIsNameError(true)
      hasError = true
    }
    if(!email) {
      setIsEmailError(true)
      hasError = true
    }
    if(!password) {
      setIsPasswordError(true)
      hasError = true
    }
    if(password && password.length < 8) {
      setIsPasswordError(true)
      hasError = true
    }
    if(!confirmPassword) {
      setIsConfirmPasswordError(true)
      hasError = true
    }
    if(password !== confirmPassword) {
      setIsPasswordError(true)
      setIsConfirmPasswordError(true)
      hasError = true
    }
    if(hasError) {
      return
    }

    console.log({ name, email, password, confirmPassword})

    await api.post('/api/register', {
      name,
      email,
      password,
      confirmPassword
    }).catch(error => {
      console.log(error)
      return
    })

    await api.post('/api/login', {
      email,
      password  
    }).then(response => {
      setLoginData(response.data.agendas)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    if(loginData){
      console.log(loginData)
      dispatch(set_agendas(loginData.toString()))
      sessionStorage.setItem('agendas', JSON.stringify(loginData))
      navigate(`/${loginData[0].id}`)
    }
  }, [ loginData, navigate, dispatch ])

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-secondary-def">
      <div className="h-[632px] w-[392px] p-4 rounded-2xl bg-primary">
        <div className="flex flex-col justify-center items-center gap-10 h-full w-full rounded-2xl px-4 bg-secondary-def">
          <Logo isPrimary={true} />
          <form 
            onSubmit={e => signup(e)}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="space-y-2.5 text-white">
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
              <Button onClick={navToSignin} variant="secondaryDark" width="small">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>  
  )
}
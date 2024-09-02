import { Lock, Mail } from "lucide-react"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Logo } from "../../components/logo"
import { useNavigate } from "react-router-dom"
import { FormEvent, useState } from "react"
import { api } from "../../lib/axios"

export const Signin = () => {

  const navigate = useNavigate()

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

    if(!email) {
      setIsEmailError(true)
    }
    if(!password) {
      setIsPasswordError(true)
    }

    if(isFormError) {
      return
    }
    
    await api.post('/api/login', {
      email,
      password  
    }).catch(response => {
      console.log(response)
    })

  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-secondary-def">
      <div className="h-[632px] w-[392px] p-4 rounded-2xl bg-primary">
        <div className="flex flex-col justify-center items-center gap-10 h-full w-full rounded-2xl px-4 bg-secondary-def">
          <Logo isPrimary={true} />
          <form onSubmit={e => signin(e)} className="flex flex-col items-center justify-center gap-6">
            <div className="space-y-2.5 text-white">
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
              <Button onClick={navToSignup} variant="secondaryDark" width="small">
                Cadastro
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>  
  )
}
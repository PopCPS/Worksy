import { Lock, Mail } from "lucide-react"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Logo } from "../../components/logo"
import { useNavigate } from "react-router-dom"

export const Signin = () => {

  const navigate = useNavigate()

  const navToSignup = () => {
    navigate('/signup')
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-secondary-def">
      <div className="h-[632px] w-[392px] p-4 rounded-2xl bg-primary">
        <div className="flex flex-col justify-center items-center gap-10 h-full w-full rounded-2xl px-4 bg-secondary-def">
          <Logo isPrimary={true} />
          <form className="flex flex-col items-center justify-center gap-6">
            <div className="space-y-2.5 text-white">
              <Input type="email" placeholder="E-mail">
                <Mail className="text-white" />
              </Input>
              <Input type="password" placeholder="Senha">
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
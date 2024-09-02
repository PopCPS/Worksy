import { User } from "lucide-react"
import { DatePicker } from "../../components/date-picker"

export const Header = () => {
  return (
    <header className="flex justify-between px-5">
      <DatePicker></DatePicker>
      <button className="flex items-center justify-center size-[60px] rounded-[50%] bg-secondary-def">
        <User className="text-white" />
      </button>
    </header> 
  )
}
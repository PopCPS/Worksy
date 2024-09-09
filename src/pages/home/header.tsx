import { ChevronRight, User } from "lucide-react"
import { DatePicker } from "../../components/date-picker"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { set_isNavOpen } from "../../store/reducers/dataReducer"

export const Header = () => {

  const dispatch = useAppDispatch()

  const isNavOpen = useAppSelector(state => state.apiData.isNavOpen)

  const openNav = () => {
    if(window.innerWidth < 640) {
      dispatch(set_isNavOpen(!isNavOpen))
      console.log(isNavOpen)
    }
  }

  return (
    <header className="relative flex flex-col sm:flex-row items-center justify-evenly md:justify-between px-5">
      <button onClick={openNav} className="absolute left-1 sm:static lg:hidden">
        <ChevronRight size={40} className="text-secondary-def" />
      </button>
      <DatePicker></DatePicker>
      <button className=" hidden lg:flex items-center justify-center size-[60px] rounded-[50%] bg-secondary-def">
        <User className="text-white" />
      </button>
    </header> 
  )
}
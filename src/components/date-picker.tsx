import dayjs from "dayjs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RefObject, useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../store/hooks"
import { set_day, set_month } from "../store/reducers/dataReducer"

interface DayProps {
  day: number
  daysRef: RefObject<HTMLDivElement> | null
}

const Day = ({
  day,
  daysRef,
}: DayProps) => {

  const dispatch = useAppDispatch()

  return (
    <span  
      onClick={() => {
        if(daysRef && daysRef.current) {
          daysRef.current?.scrollTo({
            left: 48 * (day - 1) ,
            behavior: 'smooth'
          });
        }
        dispatch(set_day(day))
      }}
      className="flex items-center justify-center size-12 z-10 text-shadow cursor-pointer focus:outline-none"
    >
      {day}
    </span>
  )
}

interface DaysProps {
  monthIndex: number
}

const Days = ({
  monthIndex,
}: DaysProps) => {
  function isBissexto(year: number) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true; 
        } else {
          return false;
        }
      } else {
        return true; 
      }
    } else {
      return false;
    }
  }

  const daysRef = useRef<HTMLDivElement | null>(null)
  const yearIsBissexto = isBissexto(new Date().getFullYear())
  const monthDays = [
    31,
    yearIsBissexto ? 29 : 28,
    31,
    30,
    31,
    30,
    31, 
    31,
    30,
    31,
    30,
    31,
  ]
  const length = monthDays[monthIndex]
  const days =  Array.from({ length }, (_, index) => index)

  useEffect(() => {
    daysRef.current?.scrollTo({
      left: 48 * (Number(dayjs().format('D')) - 1),
    }); 
  }, [daysRef])

  return (
    <div ref={daysRef} className="flex gap-4 text-2xl rounded-3xl font-bold overflow-hidden no-scrollbar">
      <div className="flex z-10 mx-[104px]">
        {days.map(day => {
          return (
            <Day key={day} daysRef={daysRef} day={day + 1} />
          )
        })}
      </div>
    </div>
  )
}

interface MonthProps {
  monthIndex: number
  setMonthIndex: (arg0: number) => void
}

const Months = ({
  monthIndex,
  setMonthIndex
}: MonthProps) => {

  const dispatch = useAppDispatch()
  const monthContainer = useRef<HTMLDivElement | null>(null)

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  const scrollNextMonth = (monthIndex: number) => {
    if(monthIndex < months.length - 1) {
      setMonthIndex(monthIndex+1)
      monthContainer.current?.scrollTo({
        left: 256 * (monthIndex+1),
        behavior: 'smooth'
      });
      dispatch(set_month(monthIndex+2))
    }
  }

  const scrollPreviousMonth = (monthIndex: number) => {
    if(monthIndex >= 1) {
      setMonthIndex(monthIndex-1)
      dispatch(set_month(monthIndex))
      monthContainer.current?.scrollTo({
        left: 256 * (monthIndex-1),
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    if(monthContainer.current) {
      monthContainer.current?.scrollTo({
        left: 256 * monthIndex,
      });
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthContainer])

  return (
    <div className="relative flex justify-center items-center rounded-3xl h-10 w-64 overflow-hidden bg-white">
      <button className="absolute left-0 focus:outline-none" onClick={() => {scrollPreviousMonth(monthIndex)}}>
        <ChevronLeft />
      </button>
      <div ref={monthContainer} className="flex min-w-full overflow-scroll no-scrollbar">
        {months.map((month, index) => {
          return (
            <span 
              key={index} 
              id={month} 
              className="flex items-center justify-center min-w-64 font-bold text-xl focus:outline-none"
            >
              {month}
            </span>
          )
        })}
      </div>
      <button className="absolute right-0 focus:outline-none" onClick={() => {scrollNextMonth(monthIndex)}}>
        <ChevronRight />
      </button>
    </div>
  )
}

export const DatePicker = () => {

  const [ monthIndex, setMonthIndex ] = useState<number>(Number(dayjs().format('M')) - 1)

  return (
    <div className="flex gap-6">
      <div className="py-2.5">
        <div className="relative flex justify-center items-center rounded-3xl h-10 w-64 bg-white">
          <div className="fixed flex justify-center items-center size-[60px] rounded-[50%] bg-secondary-def" />
          <Days 
            monthIndex={monthIndex}
          />
        </div>
      </div>  
      <div className="flex items-center">
        <Months 
          monthIndex={monthIndex}
          setMonthIndex={setMonthIndex}
        />
      </div>  
    </div>
  )
}
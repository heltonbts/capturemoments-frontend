import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import { MdClose, MdOutlineDateRange } from 'react-icons/md'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

interface DateSelectorProps {
  visitedDate: Date
  setVisitedDate: Dispatch<SetStateAction<Date>>
}

const DateSelector = ({ visitedDate, setVisitedDate }: DateSelectorProps) => {
  const [selected, setSelected] = useState<Date>(visitedDate)
  const [viewCalendar, setViewCalendar] = useState<boolean>(false)

  // Sincroniza o estado local com o prop quando ele muda
  useEffect(() => {
    setSelected(visitedDate)
  }, [visitedDate])

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelected(date)
      setVisitedDate(date) // Comunica a mudança ao componente pai
      setViewCalendar(false) // Fecha o calendário
    }
  }

  const handleOpenCalendar = () => {
    setViewCalendar(!viewCalendar)
  }

  return (
    <div className="relative w-full">
      <button
        className="inline-flex items-center gap-2 bg-purple-200 text-[13px] font-medium text-purple-600"
        onClick={handleOpenCalendar}
      >
        <MdOutlineDateRange className="text-lg" />
        {format(selected, 'do MMM yyyy', { locale: ptBR })}
      </button>
      {viewCalendar ? (
        <div className="relative h-[400px] overflow-y-scroll rounded-lg bg-purple-50/80 p-5 pt-9">
          <button
            onClick={handleOpenCalendar}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 hover:bg-purple-300"
          >
            <MdClose className="text-xl text-purple-600" />
          </button>
          <DayPicker
            locale={ptBR}
            required
            captionLayout="dropdown-years"
            mode="single"
            selected={selected}
            onSelect={handleDateSelect}
            pagedNavigation
            footer={
              selected
                ? `Selecionado: ${selected.toLocaleDateString()}`
                : 'Escolha um dia.'
            }
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default DateSelector

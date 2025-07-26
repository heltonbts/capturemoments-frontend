import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Dispatch, SetStateAction } from 'react'
import { MdOutlineDateRange } from 'react-icons/md'
interface DateSelectorProps {
  visitedDate: Date
  setVisitedDate: Dispatch<SetStateAction<Date>>
}

const DateSelector = ({ visitedDate }: DateSelectorProps) => {
  return (
    <div>
      <button className="inline-flex items-center gap-2 bg-purple-200 text-[13px] font-medium text-purple-600">
        <MdOutlineDateRange className="text-lg" />
        {format(visitedDate || ' ', 'do MMM yyyy', { locale: ptBR })}
      </button>
    </div>
  )
}

export default DateSelector

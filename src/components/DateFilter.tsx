import { ptBR } from 'date-fns/locale'
import { DayPicker, type DateRange } from 'react-day-picker'

interface Props {
  dateRange: DateRange | undefined
  handleDaySelected: (newSelected: DateRange | undefined) => void
}

const DateFilter = ({ dateRange, handleDaySelected }: Props) => {
  return (
    <aside className="w-[320px]">
      <div className="bg-white-border rounded-lg border-slate-200 shadow-lg shadow-slate-200/60"></div>
      <DayPicker
        locale={ptBR}
        required
        captionLayout="dropdown-years"
        mode="range"
        selected={dateRange}
        onSelect={handleDaySelected}
        pagedNavigation
      />
    </aside>
  )
}

export default DateFilter

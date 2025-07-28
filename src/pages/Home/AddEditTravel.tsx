import { CirclePlus } from 'lucide-react'
import { X } from 'lucide-react'
import DateSelector from '../../components/DateCalendar'
import { useState } from 'react'

const AddEditTravel = () => {
  const [visitedDate, setVisitedDate] = useState<Date>(new Date())
  return (
    <section className="relative mx-auto overflow-x-hidden">
      <div className="w-full">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-slate-700">
            Adicionar Momento
          </h2>
          <div>
            <div className="flex items-center gap-3 rounded-l-lg bg-violet-50/50 p-2">
              <button className="btn-small">
                <CirclePlus /> Adicionar Momento
              </button>

              <button>
                <X className="text-slate-400" />
              </button>
            </div>
          </div>
        </header>

        <main>
          <div className="flex flex-1 flex-col gap-2 pt-4">
            <label className="input-label">Título</label>
            <input
              type="text"
              className="text-2xl text-slate-950 outline-none"
              placeholder="Escreva sua memoria aqui"
            />

            <div className="my-3">
              <DateSelector
                visitedDate={visitedDate}
                setVisitedDate={setVisitedDate}
              />
            </div>
            <div className="my-3">Seletor de Imagem</div>
            <div className="mt-4 flex flex-col gap-2">
              <label className="input-label">Descrição</label>
              <textarea
                rows={10}
                placeholder="Seu Momento"
                className="rounded bg-slate-50 p-2 text-sm text-slate-950 outline-none"
              />
            </div>
            <div className="pt-3">
              <label>VisitedLocation</label>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}

export default AddEditTravel

import { GrMapLocation } from 'react-icons/gr'
import { MdClose, MdDelete, MdUpdate } from 'react-icons/md'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

interface Moments {
  id: string
  title: string
  story: string
  visitedLocation: string[]
  isFavorite: boolean
  userId: string
  createdOn: string
  imageUrl: string
  visitedDate: string
}

interface Props {
  onClose: () => void
  moment: Moments | null
  onHandleDelete: (id: string) => Promise<void>
  onEditClick: () => void
}

const ViewTravel = ({
  onClose,
  moment,
  onHandleDelete,
  onEditClick,
}: Props) => {
  if (!moment) {
    return <p>Carregando...</p>
  }
  const { id, imageUrl, story, title, visitedDate, visitedLocation } = moment

  const resultDate = format(new Date(visitedDate), "d 'de' MMMM yyyy", {
    locale: ptBR,
  })

  return (
    <section className="relative">
      <header className="flex items-center justify-end">
        <div className="flex items-center gap-3 rounded-l-lg bg-violet-50/50 p-2">
          <button className="btn-small" onClick={onEditClick}>
            <MdUpdate className="text-lg" /> Atualizar Story
          </button>
          <button
            onClick={() => onHandleDelete(id)}
            className="btn-small btn-delete"
          >
            <MdDelete className="text-lg" /> Excluir
          </button>
          <button className="cursor-pointer" onClick={onClose}>
            <MdClose className="text-ls text-slate-400" />
          </button>
        </div>
      </header>

      <div>
        <article className="flex flex-1 flex-col gap-2 py-4">
          <h1 className="text-2xl text-slate-950">{title}</h1>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">{resultDate}</span>
            <div className="inline-flex items-center gap-2 bg-violet-50/50 text-[13px] text-violet-600">
              <GrMapLocation className="text-sm" />
              {visitedLocation.map((item, index) =>
                visitedLocation.length == index + 1 ? `${item}` : `${item}, `,
              )}
            </div>
          </div>
        </article>

        <img
          src={imageUrl}
          alt={imageUrl}
          className="h-[300px] w-full rounded-lg object-cover"
        />

        <footer className="mt-4">
          <p className="text-justify text-sm leading-6 whitespace-pre-line text-slate-950">
            {story}
          </p>
        </footer>
      </div>
    </section>
  )
}

export default ViewTravel

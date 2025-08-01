import { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { GrMapLocation } from 'react-icons/gr'
import axiosInstance from '../../api/axiosInstance'
import { format } from 'date-fns'
import { Bounce, ToastContainer, toast } from 'react-toastify'

import { ptBR } from 'date-fns/locale'

interface Moment {
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

interface CaptureMomentCardProps {
  moments: Moment
  handleViewStory: () => void
}

const CaptureMomentCard: React.FC<CaptureMomentCardProps> = ({
  moments,
  handleViewStory,
}) => {
  const {
    title,
    story,
    visitedLocation,
    isFavorite,
    imageUrl,
    visitedDate,
    id,
  } = moments

  useEffect(() => {
    setIsFavorite(isFavorite)
  }, [isFavorite])

  const resultDate = format(new Date(visitedDate), "d 'de' MMMM yyyy", {
    locale: ptBR,
  })
  const [isFavoriteIcon, setIsFavorite] = useState(isFavorite)

  const token = localStorage.getItem('cm:token')

  const handleFavorite = async () => {
    const currentStatus = isFavoriteIcon
    const newFavoriteStatus = !currentStatus

    setIsFavorite(newFavoriteStatus)

    try {
      await axiosInstance.put(
        `/isfavorite/${id}`,
        { isFavorite: newFavoriteStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      toast.success('Momento atualizado')
    } catch (error) {
      setIsFavorite(currentStatus)
      console.log(error)
    }
  }

  return (
    <article className="relative cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white transition-all ease-in-out hover:shadow-lg hover:shadow-slate-200">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <img
        src={imageUrl}
        alt={imageUrl}
        className="h-56 w-full rounded-lg object-cover"
        onClick={handleViewStory}
      />
      <button
        className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-lg border-white/30 bg-white/40"
        onClick={handleFavorite}
      >
        <FaHeart
          className={
            isFavoriteIcon ? 'icon-btn text-red-500' : 'icon-btn text-white-500'
          }
        />
      </button>

      <div className="p-4">
        <header className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">{resultDate}</span>
          </div>
        </header>
        <p className="mt-2 text-xs text-slate-600">{story}</p>

        <div className="mt-3 inline-flex items-center gap-2 rounded bg-violet-200/40 px-2 py-1 text-[13px] text-violet-600">
          <GrMapLocation />
          {visitedLocation.map((location, index) => (
            <span key={index}>{location}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default CaptureMomentCard

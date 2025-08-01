/* eslint-disable @typescript-eslint/no-explicit-any */
import { CirclePlus } from 'lucide-react'
import { X } from 'lucide-react'
import DateSelector from '../../components/DateCalendar'
import { useState } from 'react'
import ImageUpload from './UploadImage'
import TagInput from '../../components/TagInput'
import { uploadImage } from '../../utils/uploadimage'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import axios from 'axios'
import { MdUpdate } from 'react-icons/md'

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

interface props {
  type: string
  onClose: () => void
  getAllMoments: () => void
  momentInfo: Moments | null
}

const AddEditTravel = ({ type, onClose, getAllMoments, momentInfo }: props) => {
  if (!momentInfo) {
    ;<p>Carregando Informações</p>
    return
  }

  const [visitedDate, setVisitedDate] = useState<Date>(new Date())
  const [image, setImage] = useState<File | string | null>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [tag, setTag] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const addNewCapturedMoment = async () => {
    try {
      let imageUrl = ''

      if (image && typeof image !== 'string') {
        const imageResponse = await uploadImage(image)
        imageUrl = imageResponse
        console.log(imageUrl, '@@@@@@@@@@')
      }

      const timeStamp = visitedDate.getTime()

      const res = await axiosInstance.post('add-register', {
        title,
        story: description,
        visitedLocation: tag,
        imageUrl: imageUrl,
        visitedDate: timeStamp,
      })
      console.log(imageUrl, '@@@@@@@@@@@@@@@@@@@@@@@')

      if (res.data) {
        toast.success('Momento Adicionado com Sucesso!')
        getAllMoments()
        onClose()
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message)
        } else {
          console.log('Erro inesperado, tente novamente', error)
        }
      }
    }
  }

  const updateCapturedMoment = async () => {
    // try {
    //   let imageUrl = ''
    //   if (image && typeof image !== 'string') {
    //     const imageResponse = await uploadImage(image)
    //     imageUrl = imageResponse
    //     console.log(imageUrl, '@@@@@@@@@@')
    //   }
    //   const timeStamp = visitedDate.getTime()
    //   const res = await axiosInstance.post('edit-moment', {
    //     title,
    //     story: description,
    //     visitedLocation: tag,
    //     imageUrl: imageUrl,
    //     visitedDate: timeStamp,
    //   })
    //   console.log(imageUrl, '@@@@@@@@@@@@@@@@@@@@@@@')
    //   if (res.data) {
    //     toast.success('Atualizado com Sucesso')
    //     getAllMoments()
    //     onClose()
    //   }
    // } catch (error: any) {
    //   if (axios.isAxiosError(error)) {
    //     if (
    //       error.response &&
    //       error.response.data &&
    //       error.response.data.message
    //     ) {
    //       setError(error.response.data.message)
    //     } else {
    //       console.log('Erro inesperado, tente novamente', error)
    //     }
    //   }
    // }
  }

  const handleSubmitMoment = () => {
    if (!title) {
      setError('Coloque o título, por favor')
      return
    }
    if (!description) {
      setError('Coloque uma descrição, por favor')
      return
    }
    if (!image) {
      setError('Coloque uma imagem, por favor')
      return
    }

    setError('')
    if (type === 'edit') {
      updateCapturedMoment()
    } else {
      addNewCapturedMoment()
    }
  }

  return (
    <section className="relative mx-auto overflow-x-hidden">
      <div className="w-full">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-slate-700">
            {type === 'add' ? 'Adicionar Momento' : 'Editar Momento'}
          </h2>
          <div>
            <div className="flex items-center gap-3 rounded-l-lg bg-violet-50/50 p-2">
              {type === 'add' ? (
                <button className="btn-small" onClick={handleSubmitMoment}>
                  <CirclePlus /> Adicionar Momento
                </button>
              ) : (
                <button className="btn-small" onClick={handleSubmitMoment}>
                  <MdUpdate /> Atualizar Momento
                </button>
              )}

              <button onClick={onClose}>
                <X className="text-slate-400" />
              </button>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </header>

        <main>
          <div className="flex flex-1 flex-col gap-2 pt-4">
            <label className="input-label">Título</label>
            <input
              type="text"
              className="text-2xl text-slate-950 outline-none"
              placeholder="Escreva sua memoria aqui"
              onChange={({ target }) => {
                setTitle(target.value)
              }}
              value={title}
            />

            <div className="my-3">
              <DateSelector
                visitedDate={visitedDate}
                setVisitedDate={setVisitedDate}
              />
            </div>
            <div className="my-3">
              <ImageUpload image={image} setImage={setImage} />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <label className="input-label">Descrição</label>
              <textarea
                onChange={({ target }) => {
                  setDescription(target.value)
                }}
                value={description}
                rows={10}
                placeholder="Seu Momento"
                className="rounded bg-slate-50 p-2 text-sm text-slate-950 outline-none"
              />
            </div>
            <div className="pt-3">
              <label>VisitedLocation</label>
              <TagInput tag={tag} setTag={setTag} />
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}

export default AddEditTravel

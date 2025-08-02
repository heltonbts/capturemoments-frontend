import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { FaRegFileImage } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'

interface ImageSelectorProps {
  image: string | File | null
  setImage: Dispatch<SetStateAction<File | string | null>>
  onDeleteImage: () => void
}

const ImageUpload = ({
  image,
  setImage,
  onDeleteImage,
}: ImageSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [previewUrl, setPreviewUrl] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files

    if (file) {
      setImage(file[0])
    }
  }

  function handleRemoveImage() {
    setImage(null)
    onDeleteImage()
  }

  const onChangeFile = () => {
    inputRef.current?.click()
  }

  useEffect(() => {
    if (typeof image === 'string') {
      setPreviewUrl(image)
    } else if (image) {
      setPreviewUrl(URL.createObjectURL(image))
    } else {
      setPreviewUrl('')
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [image])

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <button
          onClick={onChangeFile}
          className="flex h-[200px] w-full flex-col items-center justify-center gap-4 rounded bg-slate-50"
        >
          <div>
            <FaRegFileImage className="text-xl text-violet-500" />
          </div>
          <p> Escolha uma imagem para upload</p>
        </button>
      ) : (
        <div className="relative w-full">
          <img
            src={previewUrl}
            alt="Selected"
            className="h-[300px] w-full rounded-lg object-cover"
          />
          <button
            className="btn-small btn-delete absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <MdDeleteOutline />
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Image, CheckCircle, AlertCircle } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload?: (url: string) => void
  onError?: (error: string) => void
  maxSize?: number // em bytes
  className?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onError,
  maxSize = 25 * 1024 * 1024, // 5MB default
  className = '',
}) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('image', file)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const mockResponse = { url: URL.createObjectURL(file) }
          resolve(mockResponse.url)
        } else {
          reject(new Error('Upload falhou'))
        }
      })

      xhr.addEventListener('error', () => reject(new Error('Erro de conexão')))

      setTimeout(() => {
        xhr.open('POST', 'http://localhost:1311/image-upload')
        xhr.send(formData)
      }, 500)
    })
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setIsUploading(true)
      setError('')
      setUploadProgress(0)

      try {
        const url = await uploadImage(file)
        setUploadedImageUrl(url)
        onImageUpload?.(url)
      } catch (err) {
        console.log(err)
        const errorMessage = 'Erro ao fazer upload da imagem'
        setError(errorMessage)
        onError?.(errorMessage)
      } finally {
        setIsUploading(false)
        setUploadProgress(0)
      }
    },
    [onImageUpload, onError],
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
      },
      maxSize,
      multiple: false,
    })

  const resetUpload = () => {
    setUploadedImageUrl('')
    setError('')
    setUploadProgress(0)
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Área de Upload */}
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all ${
          isDragActive && !isDragReject
            ? 'border-blue-400 bg-blue-50'
            : isDragReject
              ? 'border-red-400 bg-red-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''} `}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className="space-y-4">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            <div className="space-y-2">
              <p className="font-medium text-gray-600">Fazendo upload...</p>
              <div className="mx-auto h-2 w-full max-w-xs rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                {Math.round(uploadProgress)}%
              </p>
            </div>
          </div>
        ) : uploadedImageUrl ? (
          <div className="space-y-4">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <div>
              <p className="mb-4 font-medium text-green-600">
                Upload concluído!
              </p>
              <img
                src={uploadedImageUrl}
                alt="Imagem enviada"
                className="mx-auto h-32 max-w-full rounded-lg border object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  resetUpload()
                }}
                className="mt-3 text-sm text-gray-500 underline hover:text-gray-700"
              >
                Escolher outra imagem
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Image
              className={`mx-auto h-12 w-12 ${
                isDragActive ? 'text-blue-500' : 'text-gray-400'
              }`}
            />
            <div>
              <p
                className={`font-medium ${
                  isDragActive ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {isDragActive
                  ? isDragReject
                    ? 'Arquivo não suportado'
                    : 'Solte a imagem aqui'
                  : 'Arraste uma imagem ou clique para selecionar'}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                PNG, JPG, WEBP até {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mensagem de Erro */}
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}

export default ImageUpload

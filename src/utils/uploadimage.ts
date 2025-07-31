import axiosInstance from '../api/axiosInstance'

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData()

  formData.append('image', imageFile)

  try {
    const res = await axiosInstance.post('/image-upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

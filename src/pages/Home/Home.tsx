import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Navbar from '../../components/Navbar'
import CaptureMomentCard from '../../components/Card/CaptureMomentCard'
import { CirclePlus } from 'lucide-react'
import Modal from 'react-modal'
import AddEditTravel from './AddEditTravel'

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

const Home = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [userMoments, setUserMoments] = useState<Moments[]>([])
  const [openEditModal, setOpenEditModal] = useState({
    isShow: false,
    type: 'add',
    data: null,
  })
  const navigate = useNavigate()

  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get('/get-user')
      if (res.data && res.data.user) {
        setUserInfo(res.data)
        console.log(res.data)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.clear()
          navigate('/login')
        }
      }
    }
  }

  const getAllMoment = async () => {
    try {
      const res = await axiosInstance.get('/get-allmoments')
      if (res.data.moments) {
        setUserMoments(res.data.moments)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllMoment()
    getUserInfo()
  }, [])

  return (
    <div className="relative">
      <Navbar userInfo={userInfo} />
      <main className="container mx-0 py-10">
        <div className="flex gap-7">
          <section className="1 flex">
            {userMoments.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {userMoments
                  .sort(
                    (a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0),
                  )
                  .map((moments) => (
                    <CaptureMomentCard key={moments.id} moments={moments} />
                  ))}
              </div>
            ) : (
              'Sem Momentos Registrados'
            )}
          </section>
          <aside className="w-[320px]" />
        </div>
      </main>
      <button
        onClick={() => {
          setOpenEditModal({
            isShow: true,
            type: 'add',
            data: null,
          })
        }}
        className="absolute fixed right-4 bottom-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary hover:bg-violet-400"
      >
        <CirclePlus />
      </button>

      <Modal
        isOpen={openEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 999,
          },
        }}
        ariaHideApp={false}
        className="model-box"
        contentLabel="Example Modal"
      >
        <AddEditTravel />
      </Modal>
    </div>
  )
}

export default Home

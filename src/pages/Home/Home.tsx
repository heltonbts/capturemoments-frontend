import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Navbar from '../../components/Navbar'
import CaptureMomentCard from '../../components/Card/CaptureMomentCard'
import { CirclePlus } from 'lucide-react'
import Modal from 'react-modal'
import AddEditTravel from './AddEditTravel'
import ViewTravel from './ViewTravelMoment'
import { toast } from 'react-toastify'
import DateFilter from '../../components/DateFilter'
import type { DateRange } from 'react-day-picker'
import EmptyCard from '../../components/Card/EmptyCard'
import imgError from '../../assets/images.png'

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

  const [openViewModal, setViewModal] = useState<{
    isShow: boolean
    type: string
    data: Moments | null
  }>({
    isShow: false,
    type: 'add',
    data: null,
  })

  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const filterMomentByDate = async (newSelected: DateRange | undefined) => {
    try {
      const startDate = newSelected?.from
        ? new Date(newSelected.from).getTime()
        : null
      const endDate = newSelected?.to
        ? new Date(newSelected.to).getTime()
        : null
      const token = localStorage.getItem('cm:token')

      if (startDate && endDate && token) {
        const res = await axiosInstance.get('/get-allmoments/filter', {
          params: {
            startDate,
            endDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.data) {
          toast.success('filtro aplicado com sucesso')
          setUserMoments(res.data)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDaySelected = (newSelected: DateRange | undefined) => {
    setDateRange(newSelected)
    filterMomentByDate(newSelected)
  }

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

  const handleViewStory = (moment: Moments) => {
    setViewModal({
      isShow: true,
      type: 'view',
      data: moment,
    })
  }

  const handleDeleteMoment = async (id: string) => {
    const token = localStorage.getItem('cm:token')
    try {
      await axiosInstance.delete(`/delete-moment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      await getAllMoment()
      setViewModal((prevState) => ({ ...prevState, isShow: false }))
      toast.error('Momento apagado com sucesso.')
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditClick = () => {
    setViewModal((prevState) => ({ ...prevState, isShow: false }))
    setOpenEditModal((prevState) => ({
      ...prevState,
      type: 'edit',
      isShow: true,
    }))
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
                  .sort((a, b) => {
                    if (a.isFavorite !== b.isFavorite) {
                      return b.isFavorite ? 1 : -1
                    }

                    return (
                      new Date(b.visitedDate).getTime() -
                      new Date(a.visitedDate).getTime()
                    )
                  })
                  .map((moments) => (
                    <CaptureMomentCard
                      key={moments.id}
                      moments={moments}
                      handleViewStory={() => handleViewStory(moments)}
                    />
                  ))}
              </div>
            ) : (
              <EmptyCard
                message="Nenhum registro encontrado.
Para começar, toque no botão “+” para cadastrar um novo item."
                imgSrc={imgError}
              />
            )}
          </section>
          <aside className="w-[320px]" />
          <DateFilter
            dateRange={dateRange}
            handleDaySelected={handleDaySelected}
          />
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
        <div className="w-full overflow-x-hidden">
          <AddEditTravel
            momentInfo={openViewModal.data}
            type={openEditModal.type}
            onClose={() => {
              setOpenEditModal({ isShow: false, data: null, type: 'add' })
            }}
            getAllMoments={getAllMoment}
          />
        </div>
      </Modal>

      <Modal
        isOpen={openViewModal.isShow}
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
        <div className="w-full overflow-x-hidden">
          <ViewTravel
            moment={openViewModal.data}
            onClose={() => {
              setViewModal((prevState) => ({ ...prevState, isShow: false }))
            }}
            onEditClick={handleEditClick}
            onHandleDelete={handleDeleteMoment}
          />
        </div>
      </Modal>
    </div>
  )
}

export default Home

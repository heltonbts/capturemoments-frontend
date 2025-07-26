import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Navbar from '../../components/Navbar'

const Home = () => {
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()

  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get('/get-user')
      if (res.data && res.data.user) {
        setUserInfo(res.data)
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

  console.log(userInfo, '@@@@@@')

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div>
      <Navbar userInfo={userInfo} />
    </div>
  )
}

export default Home

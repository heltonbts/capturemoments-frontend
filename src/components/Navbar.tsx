import Logo from '../assets/captured-moments-logo.svg'
import ProfileInfo from './Card/ProfileInfo'

type NavbarProps = {
  userInfo: {
    user: {
      fullName: string
      email: string
    }
  } | null
}

const Navbar = ({ userInfo }: NavbarProps) => {
  if (!userInfo) {
    return null
  }
  const isToken = localStorage.getItem('cm:token')
  const showProfileItem = isToken && userInfo

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-2 drop-shadow">
      <img src={Logo} alt="logo" className="h-11" />

      {showProfileItem && <ProfileInfo userInfo={userInfo} />}
    </div>
  )
}

export default Navbar

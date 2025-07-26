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
    return
  }
  const { user } = userInfo
  console.log(user, 'filho')
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-2 drop-shadow">
      <img src={Logo} alt="logo" className="h-11" />

      <ProfileInfo user={user} />
    </div>
  )
}

export default Navbar

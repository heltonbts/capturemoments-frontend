import { useNavigate } from 'react-router'
import { LogOut } from 'lucide-react'

interface ProfileProps {
  userInfo: {
    user: {
      fullName: string
    }
  }
}

const ProfileInfo = ({ userInfo }: ProfileProps) => {
  const navigate = useNavigate()
  const { user } = userInfo
  const nameParts = user.fullName.split(' ')
  const userName = `${nameParts[0]} ${nameParts[1] || ''}`.trim()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-medium text-slate-950">
        {user.fullName
          .split(' ')
          .slice(0, 2)
          .map((name) => name[0]?.toUpperCase())
          .join('')}
      </div>
      <div>
        <p className="text-sm font-medium">{userName}</p>
        <button
          className="flex cursor-pointer items-center justify-center gap-1 text-sm text-slate-700 underline"
          onClick={handleLogout}
        >
          <LogOut className="h-5" /> Sair
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo

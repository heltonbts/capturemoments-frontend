interface ProfileProps {
  user: {
    fullName: string
  }
}

const ProfileInfo = ({ user }: ProfileProps) => {
  if (!user.fullName) {
    return null
  }
  const nameParts = user.fullName.split(' ')
  const userName = `${nameParts[0]} ${nameParts[1] || ''}`.trim()

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
        <p className="text-sm font-medium">{userName || 'Visitante'}</p>
        <button className="text-sm text-slate-700 underline">
          {user ? 'Sair' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo

import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

const Input = ({ value, onChange, placeholder }: InputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const togglesShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <div className="mb-3 flex items-center rounded bg-violet-600/5 px-5">
      <input
        type={isShowPassword ? 'text' : 'password'}
        value={value}
        placeholder={placeholder || ''}
        onChange={onChange}
        className="mr-4 w-full rounded bg-transparent py-3 text-sm outline-none"
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="cursor-pointer text-primary"
          onClick={togglesShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          onClick={togglesShowPassword}
          className="cursor-pointer text-primary"
        />
      )}
    </div>
  )
}

export default Input

import { useState, type FormEvent } from 'react'
import Input from '../../components/PasswordInput.tsx'
import { regex } from 'regex'
import axiosInstance from '../../api/axiosInstance.ts'
import { useNavigate } from 'react-router'
import axios from 'axios'

const Login = () => {
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<null | string>(null)

  const navigate = useNavigate()

  const emailRegex = regex`
  ^ [^\s@]+ @ [^\s@]+\.[^\s@]+ $
`

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    if (!emailRegex.test(email)) {
      setError('Email inválido.')
      return
    }

    if (!password) {
      setError('Informe a senha.')
      return
    }

    setError('')

    try {
      const res = await axiosInstance.post('/login', { email, password })
      if (res.data && res.data.accessToken) {
        localStorage.setItem('cm:token', res.data.accessToken)
        navigate('/home')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message)
        } else {
          setError('Erro inesperado, tente novamente')
        }
      }
    }
  }

  return (
    <main className="relative h-screen overflow-hidden bg-violet-50">
      <aside className="login-ui-box right-1/2 -bottom-40 z-0 bg-violet-200" />
      <aside className="login-ui-box -top-40 right-10 z-0" />
      <div className="relative z-10 container mx-auto flex h-screen items-center justify-center px-20">
        <section className="flex h-[90vh] w-2/4 flex-col items-start justify-end rounded-lg bg-[url('/public/images/floresta.png')] bg-cover bg-center p-10">
          <h4 className="text-5xl leading-[58px] font-semibold text-white">
            Registre seu <br /> momento
          </h4>
          <p className="mt-4 pr-7 text-[15px] leading-6 text-white">
            Capture momentos de aventura em sua viagem e guarde tudo no seu feed
            pessoal
          </p>
        </section>
        <section className="relative h-[75vh] w-2/4 rounded-r-lg bg-white p-16 shadow-lg shadow-violet-200/20">
          <form onSubmit={handleLogin}>
            <h4 className="mb-7 text-2xl font-semibold">Login</h4>
            <input
              type="text"
              placeholder="E-mail"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              value={password}
              onChange={({ target }) => {
                setPassword(target.value)
              }}
              placeholder="Senha"
            />

            <button
              type="submit"
              className="btn-primary"
              onSubmit={handleLogin}
            >
              Login
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <p className="my-4 text-center text-xs text-slate-500">ou</p>

            <button
              type="submit"
              className="btn-primary btn-light"
              onClick={() => navigate('/signup')}
            >
              Registra-se
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Login

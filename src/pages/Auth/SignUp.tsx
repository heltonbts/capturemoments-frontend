import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import axiosInstance from '../../api/axiosInstance'
import axios from 'axios'
import Input from '../../components/PasswordInput'
import { regex } from 'regex'

const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [error, setError] = useState<null | string>(null)

  const emailRegex = regex`
  ^ [^\s@]+ @ [^\s@]+\.[^\s@]+ $
`

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    if (!password) {
      setError('A senha é obrigatória')
    }

    if (!emailRegex.test(email)) {
      setError('Email inválido.')
      return
    }

    if (!name) {
      setError('Todos os campos são obrigatórios')
      return
    }

    setError('')

    try {
      const res = await axiosInstance.post('/create-account', {
        email,
        fullName: name,
        password,
      })
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
    <main className="relative h-screen overflow-hidden bg-emerald-50">
      <aside className="login-ui-box right-1/2 -bottom-40 z-0 bg-emerald-200" />
      <aside className="login-ui-box -top-40 right-10 z-0" />
      <div className="relative z-10 container mx-auto flex h-screen items-center justify-center px-20">
        <section className="flex h-[90vh] w-2/4 flex-col items-start justify-end rounded-lg bg-[url('/public/images/floresta.png')] bg-cover bg-center p-10">
          <h4 className="text-5xl leading-[58px] font-semibold text-white">
            Embarque na sua <br /> jornada
          </h4>
          <p className="mt-4 pr-7 text-[15px] leading-6 text-white">
            Registra-se e Capture momentos de aventura em sua viagem e guarde
            tudo no seu feed pessoal
          </p>
        </section>
        <section className="relative h-[75vh] w-2/4 rounded-r-lg bg-white p-16 shadow-lg shadow-emerald-200/20">
          <form onSubmit={handleSignUp}>
            <h4 className="mb-7 text-2xl font-semibold">Registra-se</h4>
            <input
              type="text"
              placeholder="Nome Completo"
              className="input-box"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="text"
              placeholder="E-mail"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              className="btn-primary bg-emerald-500 text-white hover:bg-emerald-200"
              onClick={() => navigate('/signup')}
            >
              Registra-se
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <p className="my-4 text-center text-xs text-slate-500">ou</p>
            <button
              onClick={() => navigate('/login')}
              type="submit"
              className="btn-primary btn-light btn-emerald-100 text-emerald-500 hover:bg-emerald-100"
            >
              Login
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
export default Signup

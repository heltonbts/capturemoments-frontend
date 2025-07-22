const Login = () => {
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
          <form>
            <h4 className="mb-7 text-2xl font-semibold">Login</h4>
            <input type="text" placeholder="E-mail" className="input-box" />

            <input type="text" placeholder="Senha" className="input-box" />

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="my-4 text-center text-xs text-slate-500">ou</p>

            <button type="submit" className="btn-primary btn-light">
              Registra-se
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Login

import { useState } from 'react'
import RegisterForm from '../../components/Auth/RegisterForm'
import LoginForm from '../../components/Auth/LoginForm'

const Login = () => {
  const [register, setRegister] = useState(false)

  return (
    <>
      <img alt="Donut6" className="hidden lg:block absolute right-1/2 -mt-10 -mr-80 top-0 w-2/6 z-50" src="https://www.pandonuts.com/wp-content/uploads/2021/03/BlaMocWeb.png" />
      <div
        className="overflow-hidden absolute right-0 bg-gradient-to-r from-donutGradientPink to-donutGradientGreen hidden h-screen shadow-lg lg:w-1/2 lg:block"
      >
        <img alt="Donut1" className="absolute left-0 -mt-44 -ml-10 top-0 w-2/3" src="https://www.pandonuts.com/wp-content/uploads/2021/03/AppPan.png" />
        <img alt="Donut2" className="absolute -mt-24 -mr-48 right-0 top-0 w-2/3" src="https://www.pandonuts.com/wp-content/uploads/2021/03/DouMoc.png" />
        <img alt="Donut3" className="absolute right-0 bottom-0 -mb-52 -mr-48 w-2/3" src="https://www.pandonuts.com/wp-content/uploads/2021/03/OriPan.png" />
        <img alt="Donut4" className="absolute left-0 bottom-0 -ml-40 -mb-40 w-2/3" src="https://www.pandonuts.com/wp-content/uploads/2021/03/YuzPan.png" />
        <img alt="Donut5" className="absolute right-0 bottom-0 w-2/3" src="https://www.pandonuts.com/wp-content/uploads/2021/03/MatMoc-1.png" />
      </div>
      <div className="min-h-screen lg:max-w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {register ? <RegisterForm /> : <LoginForm />}
        <button className="absolute top-8 text-donutPurple mb-auto" onClick={() => setRegister(!register)} type="button">
          <small>{register ? 'Already registered?' : 'Need to register?'}</small>
        </button>
      </div>
    </>
  )
}

export default Login

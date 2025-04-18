import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react'
const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { backendUrl, token, setToken, navigate } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token_p.co', response.data.token);

        }
        else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password })
        console.log(response.data);

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token_p.co', response.data.token);

        }
        else {
          toast.error(response.data.message);
        }

      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex flex-row items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-mono'>
          {currentState}
        </p>
        <p className='text-3xl font-mono'>
          {loading ? <p>Loading...</p> : ``}
        </p>
        <hr className=' border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Sign Up' ? <input onChange={(e) => setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required /> : ``}
      <input onChange={(e) => setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <div className='w-full relative'>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Password'
          required
        />
        <div
          className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </div>
      </div>

      <div className='w-full flex justify-between text-sm mt-[-8x]'>
        <p className='cursor-pointer'> Forgot your password? </p>
        {
          currentState === 'Login' ?
            <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create account</p>
            :
            <p className='cursor-pointer' onClick={() => setCurrentState('Login')}> Login Here</p>
        }

      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4   cursor-pointer '>
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>

    </form>
  )
}

export default Login
import React, { useState } from 'react'
import axios from 'axios';
import { BackendURL } from '../App';
import { toast } from 'react-toastify';
import LoadingPage from "../components/LoadingPage";
import { useNavigate } from 'react-router-dom';
const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 const [loading, setLoading] = useState(false);
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post(BackendURL + '/api/user/admin', { email, password })
            if (response.data.success) {
                
                setToken(response.data.token)
                useNavigate('/add')
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error)
        }finally{
            setLoading(false)
        }
    }
    return loading === true ? <LoadingPage /> : (
        <div className='flex min-h-screen justify-center items-center w-full '>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72 '>
                        <p className='text-sm font-medium text-gray-700 mb-2 '>
                            Email Address
                        </p>
                        <input onChange={(e) => setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='admin@gmail.com' required />
                    </div>
                    <div className='mb-3 min-w-72 '>
                        <p className='text-sm font-medium text-gray-700 mb-2 '>
                            Password
                        </p>
                        <input onChange={(e) => setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='*********' required />
                    </div>
                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login

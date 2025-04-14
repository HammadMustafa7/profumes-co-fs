import React from 'react'
import { assets } from '../assets/assests'

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
      <div className='flex flex-row items-center '>
      <img className={`w-[max(10%, 80px)] max-h-[120px] `} src={assets.logo} alt="" />
      <p className='text-xl font-bold'>Admin Panel</p>
      </div>

      <button onClick={()=>setToken('')}  className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar

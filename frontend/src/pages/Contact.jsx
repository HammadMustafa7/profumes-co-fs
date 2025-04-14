import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assests'

const Contact = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 border-t '>
          <Title text1={'CONTACT'} text2={'US'} />
        </div>
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img className='w-full h-screen md:max-w-[430px] md:h-[480px]' src={assets.perfume_contact} alt="" />
          <div className='flex flex-col gap-6 justify-center items-start'>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'>Lahore, Pakistan</p>
            <p className='text-gray-500'>Tel: +92-323-4828632</p>
            <p className='text-gray-500'>Email: support@example.com</p>
            

          </div>
        </div>
    </div>
  )
}

export default Contact
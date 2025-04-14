import React from 'react'
import Title from './Title';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assests';

const CategoriesList = () => {
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1="OUR" text2="CATEGORIES" />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 gap-y-6 '>
            <Link to='/new_arrival'>
            <img className='lg:w-[80%] md:w-[90%] w-full h-full rounded-lg hover:shadow-lg transition cursor-pointer' src={assets.new_arrival} alt="" />
            </Link>
            <Link to='/collection?category=men'>
            <img className='lg:w-[80%] md:w-[90%] w-full h-full rounded-lg hover:shadow-lg transition cursor-pointer' src={assets.for_men} alt="" />
            </Link>
            <Link to='/collection?category=women'>
            <img className='lg:w-[80%] md:w-[90%] w-full h-full rounded-lg hover:shadow-lg transition cursor-pointer' src={assets.for_women} alt="" />
            </Link>
        </div>
    </div>
  )
}

export default CategoriesList
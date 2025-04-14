import React from 'react'
import {assets} from '../assets/assests'
import { Link, NavLink } from 'react-router-dom'
const Footer = () => {
  return (
    <div className=''>
    <div className='flex flex-col justify-between sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div >
            <Link to='/' className='flex items-center gap-2'>
            <img className='mb-2 w-32' src={assets.logo} alt="Profume.co" />
            </Link>
            <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae id dolor est, nam, error sequi aliquam quis incidunt fugiat nulla repellat. Ut culpa reprehenderit accusantium. 
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/collection'>Collection</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <li>+92-323-0000000</li>
              <li>support@example.com</li>
              
            </ul>
          </div>
        
        </div>
        <div >
          <hr />
          <p className='py-5 text-sm text-center '> Copyright &copy; {new Date().getFullYear()} Profumes.co - All Rights Reserved </p>
        </div>
    </div>
  )
}

export default Footer
import React from 'react'
import {NavLink} from 'react-router-dom'
import { CirclePlus, LibrarySquare, SquareCheck } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className='w-[15%] sm:w-[12%] md:w-[20%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink title='Add' to={"/add"} className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l '}>
            <CirclePlus className='w-5'  />
            <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink title='List' to={"/list"} className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l '}>
            <LibrarySquare className='w-5'  />
            <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink title='Orders' to={"/orders"} className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l '}>
            <SquareCheck className='w-5'  />
            <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar

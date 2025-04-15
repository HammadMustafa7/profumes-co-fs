import React, { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assests'
import { Search, User, AlignJustify, ChevronLeft } from 'lucide-react';
import { FaBagShopping } from "react-icons/fa6";
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
    const [showMenu, setShowMenu] = useState(false);
    const Logout = () => {
        navigate('/login')
        localStorage.removeItem('token_p.co')
        setToken('');
        setCartItems({});

    }
    const handleUserClick = () => {
        if (!token) {
            navigate('/login');
        } else {
            setShowMenu(prev => !prev); // Toggle dropdown on click
        }
    };

    const handleClose = () => setShowMenu(false); // optional: close on click elsewhere

    return (
        <div>
            <nav className="flex justify-between items-center py-4 font-medium">
                <a href="/" className="w-36 h-36">
                    <img src={assets.logo} alt="Profumes.co" />
                </a>
                <ul className="space-x-4 hidden sm:flex ">
                    <NavLink to="/" className="flex flex-col items-center gap-1">
                        <p>HOME</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to="/collection" className="flex flex-col items-center gap-1">
                        <p>COLLECTION</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to="/contact" className="flex flex-col items-center gap-1">
                        <p>CONTACT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </ul>

                <div className='flex items-center gap-6'>
                    <Search onClick={() => {
                        setShowSearch(true);
                        navigate('/collection');
                    }} size={24} className=' w-6 cursor-pointer' />

                    <div className='relative'>
                        <User
                            onClick={handleUserClick}
                            size={24}
                            className='w-6 cursor-pointer'
                        />

                        {token && showMenu && (
                            <div className='absolute right-0 mt-2 z-50'>
                                <div className='flex flex-col gap-2 w-32 font-medium py-3 px-5 bg-slate-100 text-gray-500 rounded shadow'>
                                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                                    <p onClick={() => { navigate('/orders'); handleClose(); }} className='cursor-pointer hover:text-black'>Orders</p>
                                    <p onClick={() => { Logout(); handleClose(); }} className='cursor-pointer hover:text-black'>Logout</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link to="/cart" className='relative'>
                        <FaBagShopping size={24} className=' w-6 cursor-pointer' />
                        <div className='absolute bottom-[-5px] right-[-6px] bg-white text-black border rounded-full w-3.5 h-4 aspect-square leading-4 flex items-center justify-center text-xs'>{getCartCount()}</div>
                    </Link>
                    <div onClick={() => setVisible(!visible)} className='flex sm:hidden'>
                        <AlignJustify size={26} className=' w-6 cursor-pointer' />
                    </div>
                </div>
                {/* SideBar Menu For Small Screens */}
                <div className={` absolute top-0 right-0 bottom-0 overflow-hidden transition-all bg-white ${visible ? 'w-full' : 'w-0'}`}>
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={() => setVisible(!visible)} className='flex items-center gap-4 p-3 cursor-pointer'>
                            <ChevronLeft size={24} className='h-4 cursor-pointer' />
                            <p>Back</p>
                        </div>
                        <NavLink className={`py-2 pl-6 border`} onClick={() => setVisible(!visible)} to="/" >HOME</NavLink>
                        <NavLink className={`py-2 pl-6 border`} onClick={() => setVisible(!visible)} to="/collection" >COLLECTION</NavLink>
                        <NavLink className={`py-2 pl-6 border`} onClick={() => setVisible(!visible)} to="/about" >ABOUT</NavLink>
                        <NavLink className={`py-2 pl-6 border`} onClick={() => setVisible(!visible)} to="/contact" >CONTACT</NavLink>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
import React from 'react'
import { assets } from '../assets/assests'
const Hero = () => {
    return (
        <div className='flex justify-center items-center w-full hover:scale-105 transition duration-[3000ms] ease-in-out'>
            <img src={assets.hero_image} className='w-full' alt="Deep_Desire" />
        </div>
    )
}

export default Hero;
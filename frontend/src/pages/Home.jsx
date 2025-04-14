import React from 'react'
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSellers from '../components/BestSellers';
import CategoriesList from '../components/CategoriesList';

const home = () => {
  return (
    <div>
        <Hero />
        <CategoriesList />
        <LatestCollection />
        <BestSellers />
        
    </div>
  )
}

export default home
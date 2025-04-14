import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSellers = () => {
    const { products } = useContext(ShopContext);
    const [BestSellers, setBestSellers] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item) => item.bestSeller === true);
        setBestSellers(bestProduct.slice(0, 4)); // Get the latest 4 products
    }, [products])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1="BEST" text2="SELLERS" />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              BestSellers.map((item, index) => (
                <ProductItem key={index} _id={item._id} image={item.image} name={item.name} category={item.category} price={item.price} discountedPrice={item.discountedPrice} />
              ))
            }   
        </div>
    </div>
  )
}

export default BestSellers
import React, {useEffect, useContext, useState} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]); 

    useEffect(() => {
        const sortedProducts = [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
        setLatestProducts(sortedProducts.slice(0, 4)); // Get the latest 4 products
    }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
      <Title text1="LATEST" text2="COLLECTION" />
      </div>

      {/* {Rendering Products} */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6'>
        {
          latestProducts.map((item,index) => (
            <ProductItem key={index} _id={item._id} image={item.image} name={item.name} category={item.category} price={item.price} discountedPrice={item.discountedPrice} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
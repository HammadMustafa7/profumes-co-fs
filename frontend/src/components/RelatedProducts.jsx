import React from 'react'
import { useContext, useState, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
const RelatedProducts = ({category}) => {
    const { products } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(()=>{
        if(products.length > 0){
            let productsCopy = [...products];
            productsCopy = productsCopy.filter((item) => item.category?.some((cat) => category.includes(cat)));
            setRelatedProducts(productsCopy.slice(0, 4));
        }
    }, [products])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
        <Title text1="RELATED" text2="PRODUCTS" /></div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
                relatedProducts.map((item, index) =>  (
                    <ProductItem key={index} _id={item._id} image={item.image} name={item.name} category={item.category} price={item.price} discountedPrice={item.discountedPrice} />
                    )
                )
            }

        </div>
    </div>
  )
}

export default RelatedProducts
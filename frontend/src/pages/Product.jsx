import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { Check } from 'lucide-react';
import RelatedProducts from '../components/RelatedProducts';
import NumberInput from '../components/NumberInput';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, token, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 '>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Image */}
        <div className='w-full sm:w-1/2 flex justify-center items-center'>
          <img className='w-3/4' src={productData.image} alt={productData.name} />
        </div>

        {/* Product Details */}
        <div className='flex-1'>
          <h1 className='text-3xl font-medium mt-2 '>
            {productData.name}
          </h1>
          <p className=' mt-2 text-lg font-medium'>
            {productData.discountedPrice ? (
              <>
                <span className="line-through opacity-40 mr-2">
                  {currency}
                  {productData.price}
                </span>
                <span>
                  {currency}
                  {productData.discountedPrice}
                </span>
              </>
            ) : (
              <>
                {currency}
                {productData.price}
              </>
            )}
          </p>
          <p className='mt-4 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div>
            <NumberInput setNumber={setQuantity} />
          </div>
          {token ? (
            <button
            onClick={() => {
              addToCart(productData._id, quantity); // use current value
              setQuantity(1); // reset after
            }} className=' mt-4 bg-black text-white cursor-pointer px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART </button>
          ): (
            <button
            onClick={() => {
              navigate('/login');
            }} className=' mt-4 bg-black text-white cursor-pointer px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART </button>
          )}
          
          
          <hr className='mt-6 sm:w-4/5 ' />
          <div className='mt-5'>
            <ul className='flex flex-col gap-2'>
              <li className='flex gap-2 text-base text-gray-700 font-sans'><Check className='text-gray-700' /> <span> Ready Stock </span></li>
              <li className='flex gap-2 text-base text-gray-700 font-sans'><Check className='text-gray-700' /> <span> Fast Delivery </span></li>
              <li className='flex gap-2 text-base text-gray-700 font-sans'><Check className='text-gray-700' /> <span> 14 Days easy return </span></li>
            </ul>
          </div>
          <div>
            {productData.category.map((item, index) => (
              <p key={index} className='mt-5'>{item}</p>
            ))}
          </div>
        </div>
      </div>
      {/* Description and Reviews Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border text-gray-500 px-5 py-3 text-sm'>Description</b>
          <p className='border text-gray-500 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700'>
          <p style={{ whiteSpace: 'pre-line' }}>
            {productData.briefDescription}
          </p>

        </div>

      </div>

      {/* Related Products Section */}
      <RelatedProducts category={productData.category[0]} />
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product
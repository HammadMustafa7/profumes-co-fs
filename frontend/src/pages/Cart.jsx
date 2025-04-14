import React,{useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { Trash, Trash2 } from 'lucide-react';
import CartTotal from '../components/CartTotal';
import NumberInput from '../components/NumberInput';

const Cart = () => {
  const {products, cartItems, currency, updateQuantity, navigate, getUserCart} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [number, setNumber] = useState(1);



  useEffect(()=>{
    if(products.length > 0 ){
      const tempData = [];
    for(const items in cartItems) {
      if(cartItems[items]> 0){
        tempData.push({
          id: items,
          quantity: cartItems[items],
        })
      }
    }

    setCartData(tempData);
    getUserCart();
    }
  },[cartItems, products]);
  return (
    <div className='border-t pt-14'> 
        <div className='text-2xl mb-3'>
          <Title text1={'YOUR'} text2={'CART'} />
        </div>

        <div>
          {
            cartData.map((item, index) => {
              const productData = products.find((product) => product.id === item._id);
              return (
                <div key={index} className='w-full py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[3fr_2fr_2fr_0.5fr] items-center gap-4'>
                      <div className='flex items-start gap-6'>
                        <img className='w-16 sm:w-20' src={productData.image} alt="" />
                          <div>
                            <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                            <div className='flex items-center gap-5 mt-2'>
                              <p>
                                {productData.discountedPrice ? <><span className='line-through opacity-40'>{currency} {productData.price}</span> {currency} {productData.discountedPrice}</> : `${currency} ${productData.price}`}
                              </p>
                            </div>
                          </div>
                      </div>
                      <div>
                       
                      </div>
                            <input onChange={(e) => updateQuantity(item.id, Number(e.target.value))} className='border border-gray-400 p-1 sm:px-2 sm:py-2 mt-5 w-full sm:w-2/6 lg:w-1/6'  type="number" min={1} max={10} defaultValue={item.quantity} />

                            <Trash2 onClick={()=>updateQuantity(item.id, 0)} size={24} className='cursor-pointer w-4 mr-5 sm:w-6 ' />
                </div>
              )
            })
          }
        </div>
        <div className='flex justify-end my-20 '>
        <div className='w-full sm:w-[450px]'>
        <CartTotal />
        <div className='w-full text-end'>
             <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer '>PROCEED TO CHECKOUT</button>
        </div>
        </div>
        
        </div>
    </div>
  )
}

export default Cart
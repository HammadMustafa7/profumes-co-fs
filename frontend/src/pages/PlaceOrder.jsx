import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('cod');
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

 const onChangeHandler = (event)=>{
  const name = event.target.name;
  const value = event.target.value;

  setFormData(data => ({...data,[name]:value}))
 } 

 const onSubmitHandler = async (e) =>{
   e.preventDefault();
   try {
    let orderItems = []
    for(const items in cartItems){
      if(cartItems[items] > 0){
        const itemInfo = structuredClone(products.find(product => product._id === items))
        if(itemInfo){
          itemInfo.quantity = cartItems[items];
          orderItems.push(itemInfo)
        }
      }
    }
    let orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    }

    switch (deliveryMethod) {
      //API Calls for COD
      case 'cod':
        const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {headers:{token}});
        if(response.data.success){
          setCartItems({})
          navigate('/orders')
        }else{
          toast.error(response.data.message)
        }
        
        break;
    
      default:
        break;
    }
    
   } catch (error) {
    console.log(error);
    toast.error(error.message);
   }
 }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded px-1.5 py-3.5 w-full' required />
            <input onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded px-1.5 py-3.5 w-full' required />
          </div>
          <input onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Address' className='border border-gray-300 rounded px-1.5 py-3.5 w-full' required />
          <input onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded px-1.5 py-3.5 w-full' required />
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='Town/City' className='border border-gray-300 rounded px-1.5 py-3.5 w-full' required />
            <input onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State/County' className='border border-gray-300 rounded px-1.5 py-3.5 w-full' required />
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='ZIP/Postal Code' className='border border-gray-300 rounded px-1.5 py-3.5 w-full' required />
            <input onChange={onChangeHandler} name='country' value={formData.country} type="country" placeholder='Country' className='border border-gray-300 rounded px-1.5 py-3.5 w-full' required />
          </div>
          <input onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone Number' className='border border-gray-300 rounded px-1.5 py-3.5 w-full' required />

        </div>
        <div className='mt-8 '>
          <div className='mt-8 min-w-80 '> 
            <CartTotal />
          </div>
          <div className='mt-12 '>
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            {/* Payment Method Selection */}
            <div className='flex gap-3 flex-col lg:flex-row'>
                <div 
                // onClick={()=>setDeliveryMethod('bank')} 
                className='flex items-center gap-3 border p-2 px-3 cursor-no-drop'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${deliveryMethod === 'bank' ? 'bg-green-400' : ''}`}></p>
                  <p className='text-gray-500 text-sm font-medium mx-4'>BANK TRANSFER</p>
                </div>
                <div onClick={()=>setDeliveryMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${deliveryMethod === 'cod' ? 'bg-green-400' : ''}`}></p>
                  <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                </div>
            </div>
              {deliveryMethod === 'cod' && (
                <div className='mt-4 text-sm text-gray-500'>
                  <p>Pay with cash upon delivery.</p>
                </div>
              )}
              {deliveryMethod === 'bank' && (
                <div className='mt-4 text-sm text-gray-500 md:max-w-100'>
                  <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                </div>
              )}
            
          </div>
          <div className='w-full text-end mt-8 '>
              <button  className='bg-black text-white px-16 py-3 text-sm cursor-pointer'>
                Place Order
              </button>
          </div>
        </div>
    </form>
  )
}

export default PlaceOrder
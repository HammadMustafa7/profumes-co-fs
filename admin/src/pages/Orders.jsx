import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {BackendURL, currency} from '../App';
import {toast} from 'react-toastify'
const Orders = ({token}) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if(!token){
      return null;
    }

    try {
      const response = await axios.post(`${BackendURL}/api/order/list`, {}, {headers:{token}});
      if(response.data.success){
        setOrders(response.data.orders);
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${BackendURL}/api/order/status`, {orderId, status: e.target.value}, {headers:{token}});
      if(response.data.success){
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    fetchAllOrders()
  },[token]);
  return (
    <div>
      <h3>Order Page</h3>
      {
        orders.map((order, index)=>(
          <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
              <img className='w-12' src={order.items[0].image} alt="" />
              <div>
              <div>
                {order.items.map((orderItem, index)=>{
                  if(index === order.items.length -1){
                    return <p className='py-0.5' key={index}>
                      {orderItem.name} x {orderItem.quantity}
                    </p>
                  }else{
                    return <p className='py-0.5' key={index}>
                      {orderItem.name} x {orderItem.quantity}
                    </p>
                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-medium'>
                {`${order.address.firstName} ${order.address.lastName}`} 
              </p>
              <div>
                <p>
                  {`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country} , ${order.address.zipcode}`}
                </p>
                <p>{`${order.address.phone}`}</p>
              </div>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>

              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select onChange={(e)=>statusHandler(e, order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="OrderPlaced">OrderPlaced</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
          </div>
        ))
      }
    </div>
  )
}

export default Orders

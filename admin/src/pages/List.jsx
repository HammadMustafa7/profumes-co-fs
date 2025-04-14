import React, { useEffect, useState } from 'react'
import { BackendURL, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const List = ({token}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${BackendURL}/api/product/list`, {headers:{token}});
      if(response.data.success){
        setList(response.data.data);
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.error(error);
      toast.error(error).message
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${BackendURL}/api/product/remove`, {id}, {headers:{token}});
      if(response.data.success){
        toast.success(response.data.message)
        fetchList()
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.error(error);
      toast.error(error).message
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className='flex-flex-col gap-2'>
        {/* List Table  */}
        <div className='hidden  md:grid grid-cols-[0.2fr_1fr_2.5fr_1.5fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm mb-2'>
            <b>#</b>
            <b>Image</b>
            <b>Name</b>
            <b>Categories</b>
            <b>Price</b>
            <b className='text-right md:text-center'>Action</b>
            <b>Update</b>
        </div>

        {/* Product List */}

        {
          list.map((item, index)=>(
            <div key={index} className='grid grid-cols-[0.2fr_1fr_1fr_1fr_1fr_1fr1_1fr] md:grid-cols-[0.2fr_1fr_2.5fr_1.5fr_1fr_1fr_1fr] items-center py-1 px-2 border-b text-sm'>
              {/* Numbers */}
              <p >{index+1}</p>
              {/* Image */}
              <img className='w-12' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category.map((item, index)=>(<span key={index}>{item}{`, `}</span>))}</p>
              <p>{currency} {item.discountedPrice > 0 ? item.discountedPrice : item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='text-center cursor-pointer text-lg border px-2 py-1 hover:text-red-400'>X</p>
              <Link className='cursor-pointer' to={`/products/${item._id}/edit`}> <p className='text-center cursor-pointer text-lg border px-2 py-1 hover:text-blue-500'>Update</p></Link>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List

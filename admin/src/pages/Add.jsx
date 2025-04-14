import React, { useState } from 'react';
import { assets } from '../assets/assests'
import axios from 'axios';
import { BackendURL } from '../App'
import LoadingPage from "../components/LoadingPage";
import { toast } from 'react-toastify';

const Add = ({ token }) => {

  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [Categories, setCategories] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(formData)

    formData.append('image', image);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('discountedPrice', discountedPrice);
    formData.append('briefDescription', briefDescription);
    formData.append('category', JSON.stringify(Categories));
    formData.append('bestSeller', bestSeller);

    console.log(formData);


    try {
      setLoading(true)
      const response = await axios.post(`${BackendURL}/api/product/add`, formData, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message)
        setName("");
        setDescription("");
        setPrice("");
        setDiscountedPrice("");
        setBriefDescription("");
        setCategories([]);
        setBestSeller(false);
        setImage(false);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  };


  return loading === true ? <LoadingPage /> : (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>
          Upload Image
        </p>
        <div className='flex '>
          <label className='cursor-pointer' htmlFor="image">
            <img className='w-26' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
          </label>
        </div>
      </div>
      <div className=' w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Type here' required />
      </div>
      <div className=' w-full'>
        <p className='mb-2'>Product Description (Short)</p>
        <textarea onChange={(e) => setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Write Short Description Here' required />
      </div>
      <div className=' w-full'>
        <p className='mb-2'>Categories</p>
        <div className='flex gap-3'>
          <div onClick={(e) => setCategories(prev => prev.includes("men") ? prev.filter(item => item !== "men") : [...prev, "men"])}>
            <p className={`${Categories.includes('men') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>Mens</p>
          </div>
          <div onClick={(e) => setCategories(prev => prev.includes("women") ? prev.filter(item => item !== "women") : [...prev, "women"])}>
            <p className={`${Categories.includes('women') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>Womens</p>
          </div>
          <div onClick={(e) => setCategories(prev => prev.includes("unisex") ? prev.filter(item => item !== "unisex") : [...prev, "unisex"])}>
            <p className={`${Categories.includes('unisex') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>Unisex</p>
          </div>
        </div>
      </div>
      <div className='w-full flex gap-4 sm:gap-8 sm:flex-row flex-col'>
        <div >
          <p className='mb-2'>Product Price</p>
          <input
            type="number" step="0.01" min="0" placeholder="9999.99" value={price} required onChange={(e) => setPrice(e.target.value)} onBlur={() => {
              if (price !== '') {
                const formatted = parseFloat(price).toFixed(2); // formats like 10 → 10.00, 9.9 → 9.90
                setPrice(formatted);
              }
            }}
            className="w-full max-w-[500px] px-3 py-2"
          />
        </div>
        <div >
          <p className='mb-2'>Discounted Product Price</p>
          <input onChange={(e) => setDiscountedPrice(e.target.value)} value={discountedPrice} className='w-full max-w-[500px] px-3 py-2 ' type="number" placeholder='9999.99' />
        </div>
      </div>
      <div className=' w-full'>
        <p className='mb-2'>Product Description (Brief)</p>
        <textarea onChange={(e) => setBriefDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Write Brief Description Here' required />
      </div>
      <div>
        <label className='cursor-pointer flex gap-2' htmlFor="bestseller">
          <input onChange={(e) => setBestSeller(e.target.checked)} className='cursor-pointer' type="checkbox" id='bestseller' />
          Add to Best Seller
        </label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white cursor-pointer'>Add Product</button>
    </form>
  )
}


export default Add

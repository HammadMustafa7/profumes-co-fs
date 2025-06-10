import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assests';
import axios from 'axios';
import { BackendURL } from '../App';
import LoadingPage from "../components/LoadingPage";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Product = ({ token }) => {
  const { productId } = useParams();

  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState(""); 
  const [newDiscountedPrice, setNewDiscountedPrice] = useState("");
  const [newBriefDescription, setNewBriefDescription] = useState("");
  const [newCategories, setNewCategories] = useState([]);
  const [newBestSeller, setNewBestSeller] = useState(false);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BackendURL}/api/product/list`, { headers: { token } });
      if (response.data.success) {
        const product = response.data.data.find((item) => item._id === productId);
        if (product) {
          // Set current values
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setDiscountedPrice(product.discountedPrice);
          setBriefDescription(product.briefDescription);
          setCategories(product.category);
          setBestSeller(product.bestSeller);
          setImage(product.image);

          // Initialize editable (new) values
          setNewName(product.name);
          setNewDescription(product.description);
          setNewPrice(product.price);
          setNewDiscountedPrice(product.discountedPrice);
          setNewBriefDescription(product.briefDescription);
          setNewCategories(product.category);
          setNewBestSeller(product.bestSeller);
        } else {
          toast.error("Product not found");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', newName);
    formData.append('description', newDescription);
    formData.append('price', newPrice);
    formData.append('discountedPrice', newDiscountedPrice);
    formData.append('briefDescription', newBriefDescription);
    formData.append('category', JSON.stringify(newCategories));
    formData.append('bestSeller', newBestSeller);

    // New Update: now you can upload a new image or keep the existing one
    if (image && typeof image !== 'string') { // Ensure it's a File object, not a URL
        formData.append('image', image);
    }

    try {
      setLoading(true);      
      const response = await axios.patch(`${BackendURL}/api/product/update/${productId}`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return loading ? <LoadingPage /> : (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex'>
          <label className='cursor-pointer' htmlFor="image">
            <img className='w-26' src={!image ? assets.upload_area : typeof image === 'string' ? image : URL.createObjectURL(image)} alt="Product" />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description (Short)</p>
        <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2' placeholder='Write Short Description Here' />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Categories</p>
        <div className='flex gap-3'>
          {['men', 'women', 'unisex'].map((cat) => (
            <div key={cat} onClick={() =>
              setNewCategories((prev) =>
                prev.includes(cat)
                  ? prev.filter((item) => item !== cat)
                  : [...prev, cat]
              )
            }>
              <p className={`${newCategories.includes(cat) ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full flex gap-4 sm:gap-8 sm:flex-row flex-col'>
        <div>
          <p className='mb-2'>Product Price</p>
          <input step="0.01" type="number" min="0" placeholder="9999.99" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full max-w-[500px] px-3 py-2" />
        </div>
        <div>
          <p className='mb-2'>Discounted Product Price</p>
          <input step="0.01" value={newDiscountedPrice} onChange={(e) => setNewDiscountedPrice(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="number" placeholder='9999.99' />
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description (Brief)</p>
        <textarea value={newBriefDescription} onChange={(e) => setNewBriefDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2' placeholder='Write Brief Description Here' />
      </div>

      <div>
        <label className='cursor-pointer flex gap-2' htmlFor="bestseller">
          <input onChange={(e) => setNewBestSeller(e.target.checked)} className='cursor-pointer' type="checkbox" id='bestseller' checked={newBestSeller} />
          Add to Best Seller
        </label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white cursor-pointer' disabled={loading}>
        {loading ? 'Updating...' : 'Update Product'}
      </button>
    </form>
  );
};

export default Product;

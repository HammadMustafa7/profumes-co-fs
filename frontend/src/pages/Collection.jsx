import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { ChevronRight } from 'lucide-react';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useLocation } from 'react-router-dom';
// useQuery is used to get the query params from the URL as i added in categorieslist for men as /collection?category=men
const useQuery = () => new URLSearchParams(useLocation().search);

const collection = () => {
  const [showfilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const { products, search , showSearch } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  
// to get the category from the URL
  const query = useQuery();
  // useEffect to get the category from the URL and mark the category as checked in the filter
  useEffect(() => {
    const defaultCategory = query.get('category');
    if (defaultCategory) {
      setCategory([defaultCategory]);
    }
  }, []);

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){  
      setCategory(category.filter((item) => item !== e.target.value));
    }
    else{
      setCategory((prev) => [...prev, e.target.value]);
    }
  }


  const applyFilter = () =>{
    let productsCopy = products.slice();

    if(showSearch && search.length > 0){
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length > 0){
      productsCopy = productsCopy.filter((item) => item.category?.some((cat) => category.includes(cat)));
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    
    let filterProductsCopy = [...filterProducts];

    switch (sortType) {
  case 'low-high':
    setFilterProducts(filterProductsCopy.sort((a, b) => a.price - b.price));
    break;
  case 'high-low':
    setFilterProducts(filterProductsCopy.sort((a, b) => b.price - a.price));
    break;
  default:
    applyFilter();
    break;
}
    }

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products]);

  useEffect(()=>{
    sortProduct();
  }, [sortType]);
  useEffect(() => {
    console.log(products);
    
    }, [products]);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t '>
      {/* {Left Side for Filter} */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <ChevronRight size={24} className={`h-4  sm:hidden ${showfilter ? 'rotate-90' : ''}`} />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light  text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'men'} onChange={toggleCategory} checked={category.includes('men')} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'women'} onChange={toggleCategory} checked={category.includes('women')} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'unisex'} onChange={toggleCategory} checked={category.includes('unisex')} /> Unisex
            </p>

          </div>
        </div>
      </div>
      {/* Right Side for Products */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}

          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 '>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>

        </div>
        {/* Map Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} _id={item._id} image={item.image} name={item.name} category={item.category} price={item.price} discountedPrice={item.discountedPrice} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default collection
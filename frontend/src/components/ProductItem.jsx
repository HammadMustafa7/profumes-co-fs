import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ _id, image, name, price, discountedPrice, category }) => {
  const { currency } = useContext(ShopContext);
  const isDiscounted = discountedPrice && discountedPrice < price;


  return (
    <Link
      to={`/product/${_id}`}
      className="block relative border rounded-lg p-2 hover:shadow-md transition text-gray-700 cursor-pointer"
    >
      {/* Sale Badge */}
      {isDiscounted && (
        <div className="absolute top-0 left-0 z-10">
        {/* Triangle Ribbon */}
        <div
          className="w-0 h-0 
          rounded-tl-[6px]
            border-l-[30px] border-l-red-500
            border-t-[30px] border-t-red-500
            border-r-[30px] border-r-transparent
            border-b-[30px] border-b-transparent"
        ></div>
      
        {/* Text on Top */}
        <div className="absolute top-2.5 left-2 rotate-[-45deg] text-[10px] text-white font-bold">
          Sale!
        </div>
      </div>
      )}

      {/* Product Image */}
      <div className="overflow-hidden rounded">
        <img
          src={image}
          alt={name}
          className="hover:scale-[102%] transition-transform duration-200 ease-in-out w-full object-cover"
        />
      </div>

      {/* Product Name */}
      <p className="pt-3 pb-1 text-sm truncate">{name}</p>

      {/* Price Display */}
      <div className="text-sm font-medium">
        {isDiscounted ? (
          <>
            <span className="line-through text-gray-400 mr-2">
              {currency} {price}
            </span>
            <span className="text-green-600">
              {currency} {discountedPrice}
            </span>
          </>
        ) : (
          <span>
            {currency} {price}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;

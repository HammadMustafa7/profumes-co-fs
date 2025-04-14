import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = 'Rs.';
    const delivery_fee = 200;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(null);


    const addToCart = async (itemId, quantity) => {
        if(token){
            try {
                  await axios.post(`${backendUrl}/api/cart/add`, {itemId, quantity}, {headers:{token}});
                  syncCart();
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, quantity) => {
        if(token){
            try {
                  await axios.post(`${backendUrl}/api/cart/update`, {itemId, quantity}, {headers:{token}});
                  syncCart();
                  
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let TotalAmount = 0;
        for (const item in cartItems) {
            let productInfo = products.find((product) => product._id === item);
            if (productInfo) {
                const quantity = Number(cartItems[item]);
                const price = productInfo.discountedPrice
                    ? parseFloat(productInfo.discountedPrice)
                    : parseFloat(productInfo.price);

                TotalAmount += price * quantity;
            }

        }
        return TotalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if(response.data.success){
                setProducts(response.data.data);

            }else{
                toast.error("Error in getting products data")
            }
        } catch (error) {
            toast.error( error);
            
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {headers:{token}});
            if(response.data.success){
                setCartItems(response.data.cartData);   
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const syncCart = async () => {
        if (token) {
          await getUserCart(token);
        }
      };

    useEffect(() => {
        getProductsData();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token_p.co')) {
            setToken(localStorage.getItem('token_p.co'));
            getUserCart(localStorage.getItem('token_p.co'));
        }
    }, [token, cartItems])
    const value = {
        products, currency, delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        addToCart, getCartCount, 
        cartItems,setCartItems, updateQuantity, 
        getCartAmount,navigate,
        backendUrl, getProductsData, 
        token, setToken, getUserCart,
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
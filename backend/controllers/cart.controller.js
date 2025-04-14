import User from "../models/user.model.js";

// add products to cart
const addToCart = async (req, res) => {
    try {
      const { userId, itemId, quantity } = req.body;
  
      const userData = await User.findById(userId);
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
      let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist
      if (cartData[itemId] ) {
        if(cartData[itemId] >= 10){
          return res.json({ success: false, message: "You can add only 10 items" });
        }
        cartData[itemId] += Number(quantity);
      } else {
        cartData[itemId] = Number(quantity);
      }
  
      await User.findByIdAndUpdate(userId, { cartData });
  
      res.json({ success: true, message: "Product added to cart" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
// Update products to cart
const updateCart = async (req, res) => {
    try {
        const {userId, itemId, quantity} = req.body;

        const userData = await User.findById(userId);
        let cartData  = await userData.cartData; 

        if (quantity === 0) {
          delete cartData[itemId];
        } else {
          cartData[itemId] = Number(quantity);
        }
        // Update the cartData in the database

        await User.findByIdAndUpdate(userId, {cartData: cartData});

        res.json({success: true, message: "Cart Updated"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
        
    }
}
// get user cart
const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;

        const userData = await User.findById(userId);
        let cartData  = await userData.cartData; 

        res.json({success: true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
        
    }
}

export {
    addToCart,
    updateCart,
    getUserCart
}
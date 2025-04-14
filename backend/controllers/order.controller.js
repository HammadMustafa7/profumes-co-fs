import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        const neworder = new Order(orderData);
        await neworder.save();

        await User.findByIdAndUpdate(userId, {cartData: {}});

        res.json({success: true, message: "Order Placed"}); 
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
    }
} 

const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
    }
}

const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await Order.find({userId});

        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
} 

const updateStatus = async (req, res) => {
    try {
        const { orderId , status} = req.body;

        await Order.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: "Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}
export { placeOrder, allOrders, userOrders, updateStatus };
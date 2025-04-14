import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items:{
        type: Array,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'Order Placed'
    },
    paymentMethod:{
        type: String,
        required: true,
        default: 'COD'
    },
    payment:{
        type: Boolean,
        required: true,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
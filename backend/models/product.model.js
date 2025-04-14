import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
        required: true,
    },
    bestSeller: {
        type: Boolean,
        default: false,
    },
    briefDescription: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
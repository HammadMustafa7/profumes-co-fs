import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model.js";

//Add Product
const addProduct = async (req, res) => {
  try {
    let { name, description, price, discountedPrice, category, bestSeller, briefDescription } = req.body;

    if (!name || !description || !price || !category || !bestSeller || !briefDescription) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // Convert and validate prices
    price = Number(price);
    discountedPrice = discountedPrice === undefined || discountedPrice < price
      ? 0
      : Number(discountedPrice);

    // Handle image upload
    const image = req.files.image && req.files.image[0];
    if (!image) {
      return res.json({ success: false, message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: 'image',
      public_id: name, // Optional: use a unique ID or slug if necessary
    });

    const imageUrl = result.secure_url;

    try {
      category = typeof category === 'string' ? JSON.parse(category) : category;
    } catch (err) {
      return res.json({ success: false, message: "Invalid category format" });
    }

    const productData = {
      name,
      description,
      price,
      discountedPrice: discountedPrice < price ? discountedPrice : 0, // Ensure discountedPrice is not greater than price
      image: imageUrl,
      category,
      bestSeller: bestSeller === "true",
      briefDescription,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(productData);

    const product = new Product(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const {
      name,
      description,
      price,
      discountedPrice,
      category,
      bestSeller,
      briefDescription,
    } = req.body;

    // console.log('Request Body:', req.body);
    // console.log('Request File:', req.file);

    if (!productId) {
      return res.json({ success: false, message: "Product ID is required" });
    }

    let imageUrl; // Declare imageUrl here

    //New Update: Now you can update image 
    // Check if a file was uploaded using upload.single('image')
    if (req.file) {
      const image = req.file; // Multer puts single file info in req.file
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: 'image',
        public_id: name, // Or a more unique ID if name isn't unique
      });
      imageUrl = result.secure_url;
    }


    const product = await Product.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = parseFloat(price);
    if (discountedPrice !== undefined) product.discountedPrice = parseFloat(discountedPrice);
    if (category) product.category = JSON.parse(category);
    if (bestSeller !== undefined) product.bestSeller = bestSeller === 'true'; // because FormData sends it as string
    if (briefDescription) product.briefDescription = briefDescription;

    // Only update product.image if a new image was uploaded
    if (imageUrl) { // Check if imageUrl was set from a new upload
      product.image = imageUrl;
    }
    // else, if no new image uploaded, the existing product.image remains unchanged.


    product.updatedAt = new Date();
    await product.save();

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.json({ success: false, message: "Failed to update product" });
  }
};



const listProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

//Remove Product
const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to remove product" });

  }

}
//Info Product (Single)
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body; // or use req.params.productId depending on your route

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product info", data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Failed to fetch product info" });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  updateProduct
}


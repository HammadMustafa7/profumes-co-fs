import express from 'express'
import {addProduct, listProducts, removeProduct, singleProduct, updateProduct} from '../controllers/product.controller.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/admin.auth.js'

const productRouter = express.Router()

productRouter.post('/add',adminAuth,upload.fields([{name: 'image', maxCount: 1}]) ,addProduct)
productRouter.post('/remove',adminAuth, removeProduct)
productRouter.get('/single',adminAuth, singleProduct)
productRouter.get('/list', listProducts)
// updating the product
productRouter.patch('/update/:productId', adminAuth, upload.single('image'), updateProduct);



export default productRouter;

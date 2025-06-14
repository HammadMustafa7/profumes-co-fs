import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import OrderRouter from './routes/order.routes.js';
// App Config
const app = express();
connectDB()
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', OrderRouter)


// use app.listen when you are not using vercel or any other serverless platform when working on a local server
// app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server is running on port ${process.env.PORT || 5000}`);
// });

export default app;

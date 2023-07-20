import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoute.js';
import categoryRoutes from './routes/categoryRoute.js';

import path from "path";

//Concurrent Servers
import cors from 'cors';

//Configure env
dotenv.config();

//Connect DB
connectDB();

//rest object
const app = express();

//Cors middleware
app.use(cors());
//middleware morgan
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/category', categoryRoutes);

//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
});


//Port
const PORT = process.env.PORT;

//Run listen
app.listen(PORT, ()=>{
    console.log(`PORT is running at ${PORT}`.bgCyan.white)
});
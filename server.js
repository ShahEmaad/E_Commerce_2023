import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

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

//routes
app.use('/api/v1/auth', authRoutes);

//rest api
app.get('/',(req,res) => {
    res.send("<h1>Welcome</h1>");
});


//Port
const PORT = process.env.PORT;

//Run listen
app.listen(PORT, ()=>{
    console.log(`PORT is running at ${PORT}`.bgCyan.white)
});
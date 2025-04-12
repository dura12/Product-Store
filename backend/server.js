import express from 'express'
import dotenv from 'dotenv' 
import {connectDB} from "./config/db.js"
import productRoute from './routes/product.route.js'
dotenv.config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.get('/product',(req , res) =>{
res.send("server is ready")
});
app.use('/api/products' , productRoute)
app.listen(3000, () => {
    connectDB()
    console.log("server is running on port 3000")
    
  
})

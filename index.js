const cors=require('cors')
const express=require('express')
require('dotenv').config()
const cloudinary=require('./config/cloudinary')

//DATABASE CONNECTION
require('./config/db')

const server=express()



const route=require('./allRoute/route')
server.use(cors())
server.use(express.json())
server.use(route)

console.log("Cloudinary configured",cloudinary.config().cloud_name);




const PORT=3000

server.get('/',(req,res)=>{
    res.status(200).json("Server Started successfully")
})

server.listen(PORT,()=>{
    console.log("Server Started...");
})
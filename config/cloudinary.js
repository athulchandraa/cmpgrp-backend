const{v2:cloudinary}=require('cloudinary')

cloudinary.config({
    cloud_name:process.env.Cloudinary_cloud_name,
    api_key:process.env.Cloudinary_cloud_API_KEY,
    api_secret:process.env.Cloudinary_cloud_API_Secret_KEY
})

module.exports=cloudinary
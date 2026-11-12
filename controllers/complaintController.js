const Grievance=require('../model/complaint')
const cloudinary=require('../config/cloudinary')

const submitGrievance=async(req,res)=>{
    try{
        const { district, category, subject, description}=req.body
         if (!district || !category || !subject || !description) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    let supportingDocument = {
      url: null,
      publicId: null
    };

    // Upload file only if user selected one
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "CMPGRP/Grievances",
            resource_type: "auto"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      supportingDocument = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }

    // Save grievance in MongoDB
    const grievance = await Grievance.create({
      district,
      category,
      subject,
      description,
      supportingDocument
    });

    return res.status(201).json({
      success: true,
      message: "Grievance submitted successfully",
      grievance
    });
    }catch(error){
        console.error("Grievance submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit grievance",
      error: error.message
    });
    }
}


module.exports = { submitGrievance };
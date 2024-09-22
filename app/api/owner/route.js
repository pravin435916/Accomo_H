import { connect } from "../../models/db";
import ownerModel from "../../models/Owner.model";
import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import cloudinary from "../../config/cloudinary";
import { Readable } from "stream";
import icon from '../../lib/homeicon.png'
// Set up multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb(new Error('File type not supported'));
  },
  limits: { fileSize: 2 * 1024 * 1024 } // Limit to 2MB
});

// Middleware to process file uploads
export const config = {
  api: {
    bodyParser: false, // Disable body parsing
  },
};

// Helper function to upload a file to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.secure_url);
    });
    
    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

// Custom middleware to handle both text fields and file uploads
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};


export async function POST(req) {
    try {
      console.log("Before running middleware..."); // Debug log
      await runMiddleware(req,{}, upload.single("image")); // Ensure the correct key is used
      console.log("After running middleware..."); // Debug log
  
      console.log("Received file object:", req.file); // Log file object
  
      // Check if file was uploaded
      // if (!req.file) {
      //   console.log("No file uploaded. Please check your request.");
      //   return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
      // }
  
      // Get form fields
      const formData = await req.formData();
      console.log('Form Data:', Object.fromEntries(formData)); // Log form data
  
      // Access form fields
      const name = formData.get("name");
      const email = formData.get("email");
      const mobileNumber = formData.get("mobileNumber");
      const nearbyColleges = formData.getAll("nearbyColleges");
      const roomType = formData.get("roomType");
      const totalRooms = formData.get("totalRooms");
      const vacantSeats = formData.get("vacantSeats");
      const price = formData.get("price");
      const latitude = formData.get("latitude");
      const longitude = formData.get("longitude");
  
      // Validate required fields
      const missingFields = [];
      if (!name) missingFields.push("name");
      if (!email) missingFields.push("email");
      if (!mobileNumber) missingFields.push("mobileNumber");
      if (nearbyColleges.length === 0) missingFields.push("nearbyColleges");
      if (!roomType) missingFields.push("roomType");
      if (!totalRooms) missingFields.push("totalRooms");
      if (!vacantSeats) missingFields.push("vacantSeats");
      if (!price) missingFields.push("price");
      if (!latitude) missingFields.push("latitude");
      if (!longitude) missingFields.push("longitude");
  
      if (missingFields.length > 0) {
        return NextResponse.json({
          error: `Missing required properties: ${missingFields.join(", ")}`,
        }, { status: 400 });
      }
  
      // Handle image uploads to Cloudinary
      console.log("Uploading to Cloudinary...");
      const imageUrls = [];
      
      // Check if a file was uploaded
      const file = req.file;
      if (file && file.buffer) {
        try {
          const imageUrl = await uploadToCloudinary(file.buffer);
          console.log("Uploaded image URL:", imageUrl);
          imageUrls.push(imageUrl);
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          return NextResponse.json({ error: "Error uploading images" }, { status: 500 });
        }
      } else {
        // Use a default image URL if no file is uploaded
        const defaultImageUrl = "https://via.placeholder.com/150"; // Use your default image URL here
        console.log("No file uploaded. Using default image:", defaultImageUrl);
        imageUrls.push(defaultImageUrl);
      }
  
      // Create a new document using the Owner model
      const newOwner = new ownerModel({
        name,
        email,
        mobileNumber,
        nearbyColleges,
        roomType,
        totalRooms,
        vacantSeats,
        price,
        latitude,
        longitude,
        images: imageUrls, // Use the collected image URLs
      });
  
      // Save the document to the database
      await newOwner.save();
  
      return NextResponse.json({ message: "Owner data saved successfully!" }, { status: 201 });
    } catch (error) {
      console.error("Error in POST handler:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  


// GET request handler
export async function GET() {
  try {
    await connect(); // Ensure database connection
    const owners = await ownerModel.find(); // Fetch all owner records
    return NextResponse.json(owners, { status: 200 });
  } catch (error) {
    console.error("Error fetching owner data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { connect } from '../../models/db';
import ownerModel from "../../models/Owner.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Ensure the database connection is established
    await connect();

    // Parse form data
    const formData = await req.formData();
    const {
      name,
      email,
      mobileNumber,
      nearbyColleges,
      roomType,
      totalRooms,
      vacantSeats,
      price,
      latitude,
      longitude
    } = Object.fromEntries(formData.entries());

    // Validate that required fields are present
    if (!name || !email || !mobileNumber || !nearbyColleges || !roomType || !totalRooms || !vacantSeats || !price || latitude === undefined || longitude === undefined) {
      throw new Error("One or more required properties are missing in the request body");
    }

    // Handle images (if applicable)
    const images = [];
    formData.getAll('images').forEach(file => {
      images.push(file); // Save file handling based on your storage setup
    });

    // Create a new document using the Owner model
    const newOwner = new ownerModel({
      name,
      email,
      mobileNumber,
      nearbyColleges: nearbyColleges.split(','),
      roomType,
      totalRooms,
      vacantSeats,
      price,
      latitude,
      longitude,
      images,
    });

    // Save the document
    await newOwner.save();

    return NextResponse.json({ message: "Owner data saved successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

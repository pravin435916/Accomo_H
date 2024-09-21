import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  nearbyColleges: { type: [String] },
  roomType: { type: String, required: true },
  totalRooms: { type: Number, required: true },
  vacantSeats: { type: Number, required: true },
  price: { type: Number },
  images: { type: [String] },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

// Check if the model is already compiled
export default mongoose.models.Owner || mongoose.model('Owner', ownerSchema);

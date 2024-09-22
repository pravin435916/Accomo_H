import mongoose from 'mongoose'
export default async function connect() {
    // if (mongoose.connection.readyState === 1) return;
  try {
    const url = process.env.MONGO;
    mongoose.connect(url)
    if (!url) {
      console.error("Please define the MONGODB_URI environment variable");
      process.exit(1);
    } else {
      console.log("MongoDb Connected");
    }
  } catch (error) {
    console.error("Error in mongo :",error);
  }
}
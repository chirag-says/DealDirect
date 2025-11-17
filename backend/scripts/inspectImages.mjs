import dotenv from "dotenv";
import mongoose from "mongoose";
import Property from "../models/Property.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    const sample = await Property.findOne().lean();
    if (!sample) {
      console.log("No property documents found.");
      return;
    }
    const { _id, title, images } = sample;
    console.log({ _id, title, imagesLength: images?.length, firstImage: images?.[0] });
  } catch (error) {
    console.error("Failed to inspect properties", error);
  } finally {
    await mongoose.disconnect();
  }
};

run();

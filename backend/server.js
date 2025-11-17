import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import propertyTypeRoutes from './routes/propertyTypeRoutes.js'
dotenv.config();
connectDB();

const app = express();

const trustProxySetting = process.env.TRUST_PROXY;
if (trustProxySetting !== undefined) {
	if (trustProxySetting === "true") app.set("trust proxy", true);
	else if (trustProxySetting === "false") app.set("trust proxy", false);
	else if (!Number.isNaN(Number(trustProxySetting))) app.set("trust proxy", Number(trustProxySetting));
	else app.set("trust proxy", trustProxySetting);
} else {
	app.set("trust proxy", 1);
}

app.use(cors());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve images

// Routes
app.use("/api/propertyTypes", propertyTypeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/properties", propertyRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/userController.js";
import multer from "multer";
import { addProperty } from "../controllers/propertyController.js";
import { authMiddleware } from "../middleware/authUser.js"
const router = express.Router();
// 🖼️ Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
// ✅ Routes
router.post("/add-property", authMiddleware, upload.array("images", 10), addProperty);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/list",  getAllUsers); // Admin Protected
export default router;

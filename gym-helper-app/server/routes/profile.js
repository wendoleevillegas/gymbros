import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import passport from "passport";
import { User } from "../models/User.js"; // adjust path to your User model
import { authenticate } from "../middleware/auth.middleware.js"; 


const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup: store files on disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.patch("/", authenticate, async (req, res) => {
  try {
    const { name, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.sub, 
      { name, username }, 
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found"});
    }
    
    res.json({ data: updatedUser });
  } catch (err) {
    console.error("Profile update failed:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

router.patch("/avatar", 
    authenticate,
    upload.single("avatar"), 
    async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Build a URL to serve the file
    const uploadedUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      req.user.sub,
      { profilePicture: uploadedUrl },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found"});
    }

    res.json({ data: updatedUser });
  } catch (err) {
    console.error("Avatar upload failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

router.patch("/nutrition", authenticate, async (req, res) => {
    try {
        const { calories, protein, carbs, fats } = req.body;
        
        // Simple logic: Update the dailyLog fields
        // In a real app, you might check if 'dailyLog.date' is today, if not, reset it.
        const updatedUser = await User.findByIdAndUpdate(
            req.user.sub,
            {
                "dailyLog.calories": calories,
                "dailyLog.macros.protein": protein,
                "dailyLog.macros.carbs": carbs,
                "dailyLog.macros.fats": fats,
                "dailyLog.date": new Date()
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ data: updatedUser });
    } catch (err) {
        console.error("Nutrition update failed:", err);
        res.status(500).json({ error: "Nutrition update failed" });
    }
});

export default router;
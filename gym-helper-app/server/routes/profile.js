import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import passport from "passport";
import { User } from "../models/User.js"; // adjust path to your User model

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
    // unique filename: userId + timestamp + original extension
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.post("/avatar", 
    passport.authenticate("session"),
    upload.single("avatar"), 
    async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Build a URL to serve the file
    const uploadedUrl = `/uploads/${req.file.filename}`;

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: uploadedUrl },
      { new: true }
    );

    res.json({ data: updatedUser });
  } catch (err) {
    console.error("Avatar upload failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
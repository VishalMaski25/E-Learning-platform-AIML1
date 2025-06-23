// index.js
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import Razorpay from "razorpay";
import cors from "cors";
import mongoose from "mongoose";


dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();

// Using middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

// Route to check server status
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/uploads", express.static("uploads"));

// Importing routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";
import recommendRoutes from "./routes/recommendRoutes.js";  // Import recommendation route

// Using routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);
app.use("/api", recommendRoutes);  // Use the recommend route

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});

// Schema for Notes
const NoteSchema = new mongoose.Schema({
  lines: { type: Array, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", NoteSchema);

// Save a Note
app.post("/save-note", async (req, res) => {
  const { lines, name } = req.body;

  try {
    const existingNote = await Note.findOne({ name });

    if (existingNote) {
      return res.status(409).json({
        message: "A note with this name already exists. Do you want to update it?",
      });
    }

    const newNote = new Note({ lines, name });
    await newNote.save();
    res.status(201).json({ message: "Note saved!", id: newNote._id });
  } catch (error) {
    console.log("Failed to save note");
    
    res.status(500).json({ error: "Failed to save note" });
  }
});

// Update an existing note by name
app.put("/update-note", async (req, res) => {
  const { lines, name } = req.body;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { name },
      { lines },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found for updating." });
    }

    res.status(200).json({ message: "Note updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Retrieve a Note by name
app.get("/note/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const note = await Note.findOne({ name });

    if (!note) return res.status(404).json({ error: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve note" });
  }
});


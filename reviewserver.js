const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose
  .connect("mongodb://localhost:27017/reviews")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Model Ulasan
const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

// API Endpoint untuk mendapatkan semua ulasan
app.get("/api/reviews", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

// API Endpoint untuk menambahkan ulasan
app.post("/api/reviews", async (req, res) => {
    try {
      console.log("Data diterima:", req.body); // Logging data yang diterima
      const review = new Review(req.body);
      await review.save();
      res.json(review);
    } catch (err) {
      console.error("Error saat menyimpan ulasan:", err);
      res.status(500).json({ error: "Gagal menyimpan ulasan" });
    }
  });
  

// API Endpoint untuk menghapus ulasan berdasarkan ID
app.delete("/api/reviews/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

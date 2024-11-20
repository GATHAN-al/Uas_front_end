const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Koneksi ke MongoDB
mongoose.connect("mongodb://localhost:27017/wishlistDB")
  .then(() => console.log("Koneksi MongoDB berhasil"))
  .catch((error) => console.error("Koneksi MongoDB gagal:", error));

// Schema dan Model Wishlist
const wishlistSchema = new mongoose.Schema({
  userId: String,
  roomId: String,
  roomName: String,
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// Endpoint API
app.get("/api/wishlist/:userId", async (req, res) => {
  const { userId } = req.params;
  const wishlists = await Wishlist.find({ userId });
  res.json(wishlists);
});

app.post("/api/wishlist", async (req, res) => {
  const newWishlist = new Wishlist(req.body);
  const savedWishlist = await newWishlist.save();
  res.json(savedWishlist);
});

app.delete("/api/wishlist/:id", async (req, res) => {
  const { id } = req.params;
  await Wishlist.findByIdAndDelete(id);
  res.json({ message: "Wishlist berhasil dihapus" });
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

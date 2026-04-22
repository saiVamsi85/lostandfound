const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String, // lost or found
  location: String,
  date: Date,
  image: String,
  contact: {
    type: String,
    required: true,
  },
  searchText: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["active", "claimed", "resolved"],
    default: "active",
  },
});

module.exports = mongoose.model("Item", itemSchema);

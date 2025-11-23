import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  content: {
    type: String,
    required: true,
    trim: true
  },

  image: {
    type: String,
    default: null
  },

  category: {
    type: String,
    enum: ["investigación", "eventos", "dudas", "recursos", "general"],
    default: "general"
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Post", postSchema);

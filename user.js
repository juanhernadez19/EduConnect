import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  email: {
    type: String,
    required: true,
    unique: true,
    match: /@(?:edu|university|institucion)\./
  },

  password: { type: String, required: true },

  university: { type: String },

  role: {
    type: String,
    enum: ["estudiante", "docente", "investigador", "admin"],
    default: "estudiante"
  },

  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);

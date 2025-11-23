const mongoose = require("mongoose");

const PublicacionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["dudas", "eventos", "investigacion", "recursos"],
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Publicacion", PublicacionSchema);

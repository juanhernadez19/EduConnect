const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  contenido: { type: String, required: true },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  categoria: {
    type: String,
    enum: ['investigacion', 'eventos', 'dudas', 'recursos'],
    default: 'dudas'
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);

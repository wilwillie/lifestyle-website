const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    icon: { type: String, default: 'default-icon.jpg' },  // Gambar icon pengguna
    review: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);

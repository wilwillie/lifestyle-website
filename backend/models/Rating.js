const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', RatingSchema);

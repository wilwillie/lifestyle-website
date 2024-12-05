const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    email: { type: String, required: true },
    question: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
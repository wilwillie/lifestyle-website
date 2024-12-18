const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    comments: [CommentSchema],  // Array of comment objects
    isVerified: { type: Boolean, default: false },
});

// Pre-save hook untuk hashing password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method untuk mencocokkan password saat login
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail, sendEmail } = require('../utils/email');
const router = express.Router();
const path = require('path');

// Register
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Cek apakah email atau username sudah digunakan
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists.' });
        }

        // Buat token verifikasi (data user disisipkan dalam token, bukan langsung disimpan ke database)
        const token = jwt.sign({ username, email, password }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Kirim email verifikasi
        const verificationLink = `http://localhost:5000/auth/verify-email?token=${token}`;
        await sendVerificationEmail(email, token);

        res.status(200).json({ message: 'Signup successful. Please verify your email.' });
    } catch (err) {
        console.error('Error during signup:', err.message);
        res.status(500).json({ message: 'Error during signup process.', error: err.message });
    }
});


// Login
router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
        });

        if (!user) {
            return res.status(404).json({ message: 'Email or username not found.' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        // Buat JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Tambahkan username dan icon ke respons
        res.status(200).json({
            message: 'Login successful.',
            token,
            username: user.username, // Tambahkan username
            icon: user.icon || 'assets/images/default-profile.jpg' // Default jika icon tidak ada
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ message: 'An error occurred during login.', error: err.message });
    }
});

// Verify Email
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        // Decode token untuk mendapatkan data user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Cek apakah user sudah ada di database (email sudah diverifikasi sebelumnya)
        const existingUser = await User.findOne({ email: decoded.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already verified or user already exists.' });
        }

        // Simpan user ke database
        const newUser = new User({
            username: decoded.username,
            email: decoded.email,
            password: decoded.password, // Pastikan hashing password di model
            isVerified: true,
        });
        await newUser.save();

        // Kirim halaman HTML
        res.sendFile(path.join(__dirname, '../../frontend/email-verification.html'));
    } catch (err) {
        console.error('Error verifying email:', err.message);

        // Kirim halaman error atau JSON
        res.sendFile(path.join(__dirname, '../../frontend/email-verification-error.html'));
    }
});


// Check Username Availability
router.get('/check-username', async (req, res) => {
    const { username } = req.query;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(200).json({ message: 'Username available' });
    } catch (err) {
        console.error('Error checking username:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        console.log('Received forgot password request for email:', email);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Generate JWT token
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send email with reset link pointing to frontend
        const resetLink = `http://127.0.0.1:5500/frontend/reset-password.html?token=${resetToken}`;
        await sendEmail(
            email,
            'Password Reset',
            `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
        );

        res.status(200).json({ message: 'Reset link sent to your email.' });
    } catch (err) {
        console.error('Error in forgot password:', err.message);
        res.status(500).json({
            message: 'An error occurred.',
            error: err.message,
            stack: err.stack // Tambahkan ini untuk debug lebih detail
        });        
    }
});

// Endpoint untuk menangani POST reset password
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        // Verifikasi token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Cari user berdasarkan ID dari token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Update password user
        user.password = password; // Pastikan hashing password di model
        await user.save();

        res.status(200).send('Password reset successfully.');
    } catch (err) {
        console.error('Error resetting password:', err.message);
        res.status(400).send('Invalid or expired token.');
    }
});

module.exports = router;

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const Comment = require('./models/Comment');
const User = require('./models/User'); // Pastikan Anda mengimpor model User

dotenv.config();

// Koneksi ke database MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
    // Panggil fungsi untuk memperbarui data email pengguna lama
    updateOldUsers();
})
.catch(err => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());

// Menyajikan file statis dari folder 'assets'
app.use('/assets', express.static('assets'));

// Rute autentikasi
app.use('/auth', authRoutes);

app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ timestamp: -1 }); // Ambil komentar terbaru
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Error fetching comments.' });
    }
});


app.post('/comments', async (req, res) => {
    try {
        const { username, icon, comment } = req.body;

        // Validasi data
        if (!username || !comment) {
            return res.status(400).json({ message: 'Username and comment are required.' });
        }

        const newComment = new Comment({
            username,
            icon,
            comment,
            timestamp: new Date()  // Menambahkan waktu saat komentar diposting
        });

        await newComment.save();  // Simpan komentar ke database

        res.status(201).json({ message: 'Comment added successfully!' });
    } catch (error) {
        console.error('Error posting comment:', error);
        res.status(500).json({ message: 'Error posting comment.' });
    }
});
// Edit komentar
app.put('/comments/:id', async (req, res) => {
    try {
        const { comment } = req.body;
        const { id } = req.params;

        // Validasi input
        if (!comment) {
            return res.status(400).json({ message: 'Comment is required.' });
        }

        // Cari komentar berdasarkan ID dan perbarui
        const updatedComment = await Comment.findByIdAndUpdate(id, { comment }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.status(200).json({ message: 'Comment updated successfully!', comment: updatedComment });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Error updating comment.' });
    }
});




// Fungsi untuk memperbarui email pengguna lama
const updateOldUsers = async () => {
    try {
        // Cari semua pengguna yang tidak memiliki email
        const usersWithoutEmail = await User.find({ email: { $exists: false } });

        for (let user of usersWithoutEmail) {
            // Tambahkan email default (berdasarkan username atau logika lainnya)
            user.email = `${user.username}@example.com`;
            await user.save(); // Simpan perubahan ke database
        }

        console.log(`${usersWithoutEmail.length} users updated with default emails.`);
    } catch (err) {
        console.error('Error updating old users:', err.message);
    }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

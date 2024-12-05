const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const Comment = require('./models/Comment');
const User = require('./models/User'); // Pastikan Anda mengimpor model User
const Question = require('./models/Question');
const Rating = require('./models/Rating');
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
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

app.post('/questions', async (req, res) => {

    console.log('Request received:', req.body);

    try {
        const { email, question } = req.body;

        // Validasi sederhana
        if (!email || !question) {
            return res.status(400).json({ message: 'Email dan pertanyaan wajib diisi.' });
        }

        // Simpan ke MongoDB
        const newQuestion = new Question({ email, question });
        await newQuestion.save();

        res.status(201).json({ message: 'Pertanyaan berhasil dikirim.' });
    } catch (error) {
        console.error('Error saving question:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan pertanyaan.' });
    }
});

app.get('/ratings', async (req, res) => {
    try {
        const stats = await Rating.aggregate([
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalRatings: { $sum: 1 }
                }
            }
        ]);

        res.json(stats[0] || { averageRating: 0, totalRatings: 0 });
    } catch (error) {
        console.error('Error fetching rating statistics:', error);
        res.status(500).json({ message: 'Terjadi kesalahan.' });
    }
});

app.post('/ratings', (req, res) => {
    const { rating, email } = req.body;

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating harus berupa angka antara 1 dan 5.' });
    }

    // Membuat dan menyimpan rating baru
    const newRating = new Rating({
        email: email,
        rating: rating
    });

    // Simpan ke database
    newRating.save()
        .then(() => {
            console.log('Rating berhasil disimpan');
            res.status(200).json({ message: 'Rating berhasil disimpan.' });
        })
        .catch((error) => {
            console.error('Gagal menyimpan rating:', error);
            res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan rating.' });
        });
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

// Hapus komentar
// Menghapus komentar berdasarkan ID
app.delete('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.status(200).json({ message: 'Comment deleted successfully!' });
    } catch (error) {
        console.error('Error deleting comment:', error); // Log error di sini
        res.status(500).json({ message: 'Error deleting comment.' });
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

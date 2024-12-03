const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
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

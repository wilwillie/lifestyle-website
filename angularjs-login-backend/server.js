const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const User = require('./models/User'); // Pastikan Anda mengimpor model User

dotenv.config();

// Koneksi ke database
connectDB().then(() => {
    // Panggil fungsi untuk memperbarui data email pengguna lama
    updateOldUsers();
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
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


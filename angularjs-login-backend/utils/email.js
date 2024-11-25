const nodemailer = require('nodemailer');

// Fungsi untuk mengirim email verifikasi
const sendVerificationEmail = async (to, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.GMAIL_HOST,
            port: parseInt(process.env.GMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        console.log('Transporter configured successfully.');

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,
            subject: 'Email Verification',
            html: `
                <h1>Email Verification</h1>
                <p>Click the link below to verify your email:</p>
                <a href="http://localhost:5000/auth/verify-email?token=${token}">Verify Email</a>
            `,
        };

        console.log('Mail options created:', mailOptions);

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (err) {
        console.error('Error sending email:', err.message);
        throw new Error('Could not send verification email');
    }
};

// Fungsi generik untuk mengirim email
const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.GMAIL_HOST,
            port: parseInt(process.env.GMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,
            subject: subject,
            html: html,
        };

        console.log('Mail options created:', mailOptions);

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', to);
    } catch (err) {
        console.error('Error sending email:', err.message);
        throw new Error('Could not send email');
    }
};

// Ekspor kedua fungsi
module.exports = {
    sendVerificationEmail,
    sendEmail,
};

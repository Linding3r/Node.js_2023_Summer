import { Router } from 'express';
import nodemailer from 'nodemailer';
import { config } from 'dotenv'
config();
const router = Router();

router.post('/contact/nodemailer', async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            // Do not fail on invalid certs
            rejectUnauthorized: false,
            secureProtocol: 'TLSv1_method',
            ciphers: 'HIGH:!aNULL:!eNULL',
        },
    });

    try {
        await transporter.sendMail({
            from: '"Website Contact" <no-reply@lindinger.io>',
            to: 'lindingertwitch@gmail.com',
            subject: `Contact`,
            text: 'Your website sucks',
            html: `<h1>Lindinger you suck!</h1>`,
        });

        res.status(200).json({ success: true, message: 'Email succefully sendt' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error sending email' });
    }
});

export default router;

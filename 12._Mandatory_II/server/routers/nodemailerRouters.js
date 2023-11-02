import { Router } from 'express';
import nodemailer from 'nodemailer';
const router = Router();

router.post('/contact', async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'mauricio.homenick@ethereal.email',
            pass: 'Kw8KMtXPGYFQNMYTRu',
        },
    });

    try {
        let info = await transporter.sendMail({
            from: '"Website Contact" <no-reply@lindinger.io>',
            to: 'Test@Lindinger.io',
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

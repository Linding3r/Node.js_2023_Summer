import { Router } from 'express';
const router = Router();

const users = [];

router.post('/signup', (req, res) => {
    const { email, password, name } = req.body;
    let user = [email, password, name];
    users.push(user);
    if (user) {
        res.send({ data: { email, isAdmin: false } });
    } else {
        res.status(400).json({ error: 'Signup failed' });
    }
});

export default router;

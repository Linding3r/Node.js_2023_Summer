import { Router } from 'express';

const router = Router();

router.get('/furnitures/chair', (req, res) => {
    res.send({ dtaa: 'Monobloc' });
});

router.get('/furnitures/lamp', (req, res) => {
    res.send({ dtaa: 'I like lamp' });
});

export default router;

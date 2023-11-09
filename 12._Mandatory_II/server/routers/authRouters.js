import db from '../database/connection.js';
import { checkPassword } from '../util/passwordencryption.js';

import { Router } from 'express';
const router = Router();



router.get('/api/auth/checkAuth', (req, res) => {
    if (req.session.isAuthenticated) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
});


router.post("/api/auth/login", async (req, res) => {
    const user = await db.all(`SELECT * FROM users WHERE email = ?;`, req.body.email);
    if(user.length === 0){
      res.status(404).json({ message: `No user found with email: ${req.body.email}`})
    } else {
    if (await checkPassword(req.body.password, user[0].password)) {
      req.session.isAuthenticated = true;
      res.status(200).json({ message: "Login successful", name: user[0].name});
    } else {
      res.status(401).json({ message: "Wrong password or email" });
    }
  }
  });


router.post('/api/auth/logout', (req, res) => {
    req.session.isAuthenticated = false;
    res.status(200).json({ message: 'Logout successful' });
});



export default router;

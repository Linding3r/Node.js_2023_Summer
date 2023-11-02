import { Router } from 'express';
const router = Router();

const EMAIL = "admin@test.com";
const PASSWORD = "1234"


router.get('/checkAuth', (req, res) => {
    if (req.session.isAuthenticated) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
});


router.post("/auth/login", (req, res) => {
    if (req.body.email === EMAIL && req.body.password === PASSWORD) {
      req.session.isAuthenticated = true;
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  });


router.post('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    res.status(200).json({ message: 'Logout successful' });
});

export default router;

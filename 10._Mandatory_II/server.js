import express from "express";
import session from "express-session";
import cors from "cors";
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.static("path-to-svelte-build"));
app.use(cors());

app.use(
    session({
      secret: "dghjkJKH16$%&/()=?",
      resave: false,
      saveUninitialized: true,
    })
  );

const USERNAME = 'admin';
const PASSWORD = 'password';

function requireAuth(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

app.get('/checkAuth', (req, res) => {
    if (req.session.isAuthenticated) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    req.session.isAuthenticated = true;
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});

app.post('/logout', (req, res) => {
  req.session.isAuthenticated = false;
  res.status(200).json({ message: 'Logout successful' });
});




const PORT = 5173;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});

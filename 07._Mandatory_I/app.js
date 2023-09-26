import express from "express";
import session from "express-session";
import path from "path";
const app = express();
app.use(express.static("public"));
app.use(express.json());

app.use(
    session({
      secret: "dghjkJKH16$%&/()=?",
      resave: false,
      saveUninitialized: true,
    })
  );


const USERNAME = "admin";
const PASSWORD = "password";

function requireAuth(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/html/frontpage.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve("public/html/login.html"));
});

app.get("/express", (req, res) => {
  res.sendFile(path.resolve("public/html/express.html"));
});

app.get("/node", (req, res) => {
  res.sendFile(path.resolve("public/html/nodeJs.html"))
})

app.get("/login", (req, res) => {
  res.sendFile(path.resolve("public/html/login.html"));
});

app.get("/admin", requireAuth, (req, res) => {
  res.sendFile(path.resolve("public/html/admin.html"));
});

app.get('/checkAuth', (req, res) => {
    if (req.session.isAuthenticated) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
});

//UI Testing page
app.get("/test", (req, res) => {
  res.sendFile(path.resolve("public/html/test.html"));
});


app.post("/login", (req, res) => {
    if (req.body.username === USERNAME && req.body.password === PASSWORD) {
      req.session.isAuthenticated = true;
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  });


app.post('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    res.status(200).json({ message: 'Logout successful' });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

import express from "express";
import session from "express-session";
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use('/util', express.static('util'));

app.use(
    session({
      secret: "dghjkJKH16$%&/()=?",
      resave: false,
      saveUninitialized: true,
    })
  );

import { adminPage, frontpagePage, expressPage, js101Page, loginPage, projectsPage, serverPage, nodePage } from "./util/preparePages.js";


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
  res.send(frontpagePage);
});

app.get("/login", (req, res) => {
  res.send(loginPage);
});

app.get("/express", (req, res) => {
  res.send(expressPage);
});

app.get("/js101", (req, res) => {
  res.send(js101Page)
});

app.get("/projects", (req, res) => {
  res.send(projectsPage)
});

app.get("/server", (req, res) => {
  res.send(serverPage);
});

app.get("/node", (req, res) => {
  res.send(nodePage);
});

app.get("/login", (req, res) => {
  res.send(loginPage);
});

app.get("/admin", requireAuth, (req, res) => {
  res.send(adminPage);
});

app.get('/checkAuth', (req, res) => {
    if (req.session.isAuthenticated) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
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

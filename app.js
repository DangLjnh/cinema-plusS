const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

// Route to get all posts
app.get("/get", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to React");
    res.send(result);
  });
});
app.get("/get/currentUser", (req, res) => {
  db.query("SELECT * FROM currentuser", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.use(express.json());

app.post("/post", (req, resp) => {
  let data = {
    // uid: req.body.uid,
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    photoURL: req.body.photoURL,
    role: req.body.role,
  };
  db.query("INSERT INTO users SET ?", data, function (err, resp) {
    if (err) throw err;
  });
});
app.post("/post/currentUser", (req, resp) => {
  let data = {
    // uid: req.body.uid,
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    photoURL: req.body.photoURL,
    role: req.body.role,
  };
  db.query("INSERT INTO currentuser SET ?", data, function (err, resp) {
    if (err) throw err;
  });
});
app.post("/delete/currentUser", (req, resp) => {
  const { email } = req?.body;
  db.query(`DELETE FROM currentuser WHERE email="${email}"`, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  if (email) {
  }
  // let data = {
  //   // uid: req.body.uid,
  //   displayName: req.body.displayName,
  //   email: req.body.email,
  //   password: req.body.password,
  //   photoURL: req.body.photoURL,
  //   role: req.body.role,
  // };
  // db.query("INSERT INTO users SET ?", data, function (err, resp) {
  //   if (err) throw err;
  // });
});
app.listen(port, console.log(`Server started on port ${port}`));

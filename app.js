const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

//GET
app.get("/get/users", (req, res) => {
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
app.post("/get/userItem", (req, res) => {
  const { uid } = req.body;
  db.query(`SELECT * FROM users where uid=${uid}`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.use(express.json());

//POST
app.post("/post/user", (req, resp) => {
  let data = {
    // uid: req.body.uid,
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    photoURL: req.body.photoURL,
    role: req.body.role,
    status: req.body.status,
  };
  db.query("INSERT INTO users SET ?", data, function (err, resp) {
    if (err) throw err;
  });
});
app.post("/post/currentUser", (req, resp) => {
  let data = {
    uid: req.body.uid,
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    photoURL: req.body.photoURL,
    role: req.body.role,
    status: req.body.status,
  };
  db.query("INSERT INTO currentuser SET ?", data, function (err, resp) {
    if (err) throw err;
  });
});
app.post("/post/updateUser", (req, resp) => {
  let data = {
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    photoURL: req.body.photoURL,
    role: req.body.role,
    status: req.body.status,
  };
  let uid = req.body.uid;
  db.query(`UPDATE users SET ? WHERE uid = ${uid}`, data, function (err, resp) {
    if (err) throw err;
  });
});
// app.post("/upload", function (req, res) {
//   console.log(req.files.foo); // the uploaded file object
// });
//DELETE
app.post("/delete/currentUser", (req, resp) => {
  const { email } = req?.body;
  db.query(`DELETE FROM currentuser WHERE email="${email}"`, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});
app.post("/delete/user/:userID", (req, resp) => {
  const { uid } = req?.body;
  db.query(`DELETE FROM users WHERE uid=${uid}`, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});
app.listen(port, console.log(`Server started on port ${port}`));

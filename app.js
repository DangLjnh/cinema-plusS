const express = require("express");
const cors = require("cors");
const db = require("./db");
const fileUpload = require("express-fileupload");
var cloudinary = require("cloudinary").v2;
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());
app.use(fileUpload()); //uploadfile
let streamifier = require("streamifier");
cloudinary.config({
  cloud_name: "dwkckmmr7",
  api_key: "573416668123248",
  api_secret: "7HRHCsa7CH7LBGfz8AGsWbLoI4Q",
  secure: true,
});

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./cinema-plus/image-users");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// var upload = multer({ storage: storage }).single("file");
// app.post("/upload", function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });
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
app.get("/get/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.post("/get/categoryItem", (req, res) => {
  const { categoryID } = req.body;
  console.log(categoryID);
  db.query(
    `SELECT * FROM categories where categoryID=${categoryID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.get("/get/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.post("/get/postItem", (req, res) => {
  const { postID } = req.body;
  db.query(`SELECT * FROM posts where postID=${postID}`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//POST
app.post("/post/user", (req, resp) => {
  let data = {
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password || null,
    photoURL: req.body.photoURL,
    role: req.body.role,
    status: req.body.status,
    provider: req.body.provider,
  };
  db.query("INSERT INTO users SET ?", data, function (err, result) {
    // if (err) throw err;
    console.log(result);
    resp.send(result);
  });
});
app.post("/post/currentUser", (req, resp) => {
  let data = {
    uid: req.body.uid,
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    photoURL: req.body.photoURL,
    publicID: req.body.publicID,
    role: req.body.role,
    status: req.body.status,
    provider: req.body.provider,
  };
  db.query("INSERT INTO currentuser SET ?", data, function (err, result) {
    if (err) throw err;
    console.log(result);
    resp.send(result);
  });
});
app.post("/post/update/currentUser", (req, resp) => {
  const uid = req.body.uid;
  let data = {
    photoURL: req.body.photoURL,
    publicID: req.body.publicID,
  };
  db.query(
    `UPDATE currentuser SET ? WHERE uid = ${uid}`,
    data,
    function (err, result) {
      if (err) throw err;
      resp.send(result);
    }
  );
});
app.post("/post/updateUser", (req, resp) => {
  console.log(req.body);
  let data = {
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    photoURL: req.body.photoURL,
    role: req.body.role,
    status: req.body.status,
  };
  let uid = req.body.uid;
  db.query(
    `UPDATE users SET ? WHERE uid = ${uid}`,
    data,
    function (err, result) {
      if (err) throw err;
      resp.send(result);
    }
  );
});
app.post("/post/category", (req, resp) => {
  let data = {
    name: req.body.name,
    slug: req.body.slug,
    status: req.body.status,
  };
  db.query("INSERT INTO categories SET ?", data, function (err, result) {
    // if (err) throw err;
    console.log(result);
    resp.send(result);
  });
});
app.post("/post/updateCategory", (req, resp) => {
  let data = {
    name: req.body.name,
    slug: req.body.slug,
    status: req.body.status,
  };
  let categoryID = req.body.categoryID;
  db.query(
    `UPDATE categories SET ? WHERE categoryID = ${categoryID}`,
    data,
    function (err, result) {
      if (err) throw err;
      resp.send(result);
    }
  );
});
app.post("/post/post", (req, resp) => {
  console.log(req.body);
  let data = {
    uid: req.body.uid,
    nameAuthor: req.body.nameAuthor,
    title: req.body.title,
    slug: req.body.slug,
    categoryName: req.body.categoryName,
    photoURL: req.body.photoURL,
    publicID: req.body.publicID,
    hot: req.body.hot,
    status: req.body.status,
    content: req.body.content,
  };
  db.query("INSERT INTO posts SET ?", data, function (err, result) {
    resp.send(result);
    console.log(err);
  });
});
app.post("/upload", (req, res) => {
  const uid = req.body.uid;
  const file = req.files.file;
  let cld_upload_stream = cloudinary.uploader.upload_stream(
    {
      folder: "image-users",
    },
    function (error, result) {
      let data = {
        photoURL: result.url,
        publicID: result.public_id,
      };
      db.query(
        `UPDATE users SET ? WHERE uid = ${uid}`,
        data,
        function (err, results) {
          if (err) throw err;
          console.log(results);
          res.send(results);
        }
      );
    }
  );
  streamifier.createReadStream(file.data).pipe(cld_upload_stream);
});
app.post("/upload/currentUser", (req, res) => {
  const uid = req.body.uid;
  const file = req.files.file;
  let cld_upload_stream = cloudinary.uploader.upload_stream(
    {
      folder: "image-users",
    },
    function (error, result) {
      let data = {
        photoURL: result.url,
        publicID: result.public_id,
      };
      db.query(
        `UPDATE currentuser SET ? WHERE uid = ${uid}`,
        data,
        function (err, results) {
          if (err) throw err;
          console.log(results);
          res.send(results);
        }
      );
      db.query(
        `UPDATE users SET ? WHERE uid = ${uid}`,
        data,
        function (err, results) {
          if (err) throw err;
          console.log(results);
        }
      );
    }
  );
  streamifier.createReadStream(file.data).pipe(cld_upload_stream);
});
app.post("/upload/post", (req, res) => {
  const postID = req.body.postID;
  const file = req.files.file;
  let cld_upload_stream = cloudinary.uploader.upload_stream(
    {
      folder: "image-posts",
    },
    function (error, result) {
      let data = {
        photoURL: result.url,
        publicID: result.public_id,
      };
      db.query(
        `UPDATE posts SET ? WHERE postID  = ${postID}`,
        data,
        function (err, results) {
          if (err) throw err;
          console.log(results);
          res.send(results);
        }
      );
    }
  );
  streamifier.createReadStream(file.data).pipe(cld_upload_stream);
});
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
    resp.send(result);
    if (err) {
      console.log(err);
    }
  });
});
app.post("/delete/currentUser/image", (req, resp) => {
  const uid = req.body.uid;
  cloudinary.uploader
    .destroy(req.body.publicID, function (error, result) {
      console.log(result, error);
    })
    .then((res) => {
      if (res) {
        let data = {
          photoURL: "",
          publicID: "",
        };
        db.query(
          `UPDATE currentuser SET ? WHERE uid = ${uid}`,
          data,
          function (err, results) {
            if (err) throw err;
            resp.send(results);
          }
        );
      }
    });
});
app.post("/delete/image", (req, resp) => {
  const uid = req.body.uid;
  cloudinary.uploader
    .destroy(req.body.publicID, function (error, result) {
      console.log(result, error);
    })
    .then((res) => {
      if (res) {
        let data = {
          photoURL: "",
          publicID: "",
        };
        db.query(
          `UPDATE users SET ? WHERE uid = ${uid}`,
          data,
          function (err, results) {
            if (err) throw err;
            resp.send(results);
          }
        );
      }
    });
});
app.post("/delete/category/:categoryID", (req, resp) => {
  const { categoryID } = req?.body;
  db.query(
    `DELETE FROM categories WHERE categoryID=${categoryID}`,
    (err, result) => {
      resp.send(result);
      if (err) {
        console.log(err);
      }
    }
  );
});
app.listen(port, console.log(`Server started on port ${port}`));

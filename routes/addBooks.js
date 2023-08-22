const express = require("express");
const router = express.Router();
const multer = require("multer");
const { connection } = require("../database/sql");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("bPic"), async (req, response) => {
    const bookTitle = req.body.bTitle;
    const bookAuthor = req.body.bAuthor;
    const bookGenre = req.body.bGenre;
    const bookDescription = req.body.bDescription;
    const bookPic = req.file.filename;

    console.log(bookTitle,bookAuthor,bookGenre,bookDescription,bookPic);
    const data = {

        							
            title: bookTitle,
            author: bookAuthor,
            genre: bookGenre,
            description:bookDescription,
            image:bookPic
    };
    console.log(data);
    connection.query("INSERT into Books SET ?", data,(err,res) => {
      if (err) {
        console.error("Error adding books:", err);
        response.status(500).json({ message: 'Error adding books' });
      } else {
        console.log("Book added successfully");
        response.status(200).json({ message: 'Book added successfully' });
      }
    }
  );
});

module.exports = router;
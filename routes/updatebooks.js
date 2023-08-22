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
    var query = "";


    console.log(bookTitle,bookAuthor,bookGenre,bookDescription);
    var data = null;
    if (req.file === undefined){
        data = {

                                        
            title: bookTitle,
            author: bookAuthor,
            genre: bookGenre,
            description:bookDescription,
        };
        query = `UPDATE Books SET title = '${req.body.bTitle}', author = '${req.body.bAuthor}', genre = '${req.body.bGenre}', description = '${req.body.bDescription}' WHERE id = ${req.query.id}`
    
    }
    else{

        const bookPic = req.file.filename;
        data = {

                                        
                title: bookTitle,
                author: bookAuthor,
                genre: bookGenre,
                description:bookDescription,
                image:bookPic
        };
        query = `UPDATE Books SET title = '${req.body.bTitle}', author = '${req.body.bAuthor}', genre = '${req.body.bGenre}', description = '${req.body.bDescription}',image = '${req.file.filename}' WHERE id = ${req.query.id}`
    }
    console.log(data);
    console.log(req.query.id)
    connection.query(query, data,(err,res) => {
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
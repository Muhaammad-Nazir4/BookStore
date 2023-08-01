const express = require('express');
const router = express.Router();
const multer = require('multer');
const { connection } = require('../database/sql');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage });

router.post('/', upload.single('image'), (req, res, next) => {
  const name = req.body.title;
  const file1 = req.file.filename;
  const content = req.body.blogContent; // Change from req.body.content to req.body.blogContent
  console.log(content);
  const data = {
    blogName: name,
    blogImage: file1,
    blogContent: content,
  };
  connection.query('INSERT into blogs SET ?', data, (err, response) => {
    if (err) throw err;
    else {
      console.log('Data saved in database');
      res.redirect('http://localhost:3000');
    }
  });
});

module.exports = router;

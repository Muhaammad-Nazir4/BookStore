const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');

router.post('/', (req, res, next) => {
  const myname = req.body.name1;
  const myemail = req.body.email;
  const mypassword = req.body.password;
  const myrole = req.body.role;

  const data = {
    Username: myname,
    Email: myemail,
    Password: mypassword,
    Role: myrole,
  };

  connection.query('INSERT into Users SET ?', data, (err, response) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    } else {
      console.log("SignUp Credentials saved in database");
      return res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

  
module.exports = router;

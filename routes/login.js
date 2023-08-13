const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');


router.post('/', (req, res, next) => {
  const email1 = req.body.email;
  const password1 = req.body.password;

  connection.query(`SELECT * FROM Users WHERE Email = '${email1}' AND Password = '${password1}'`, (err, result) => {
    if (err) throw err;
    else {
      if (!result || result.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      } else {
        const user = result[0];
        return res.status(200).json({ message: 'Login successful', role: user.Role });
      }
    }
  });
});



module.exports = router;




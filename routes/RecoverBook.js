const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.get('/',(req,res,next)=>{ 
    var query = `UPDATE Books SET isDelete = '0' WHERE id = ${req.query.id}`
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.redirect(`http://localhost:3000/ViewRecoveryBooks`);
      });
})

module.exports = router;
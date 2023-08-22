const express = require("express");
const router = express.Router();
const {connection} =require("../database/sql");

router.get('/', (req,response)=>{
    console.log(`"${req.query.Search}"`)
    connection.query(`SELECT * from Books Where (author like '%${req.query.Search}%' or description like '%${req.query.Search}%' or genre like '%${req.query.Search}%') and isDelete = "0"`
    , (err,res)=>{
        if(err) throw err;
        else{
            console.log(res);
            response.send(res);
        }
    })
})
module.exports=router
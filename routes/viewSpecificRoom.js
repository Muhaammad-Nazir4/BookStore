const express = require("express");
const router = express.Router();
const {connection} =require("../database/sql");

router.get('/:roomId', (req,response)=>{
    const roomId = req.params.roomId; 
    connection.query(`SELECT * from Rooms where RoomID= ${roomId}` ,(err,res)=>{
        console.log(res);
        if(err) throw err;
        else{
            response.send(res);
        }
    })
})
module.exports=router
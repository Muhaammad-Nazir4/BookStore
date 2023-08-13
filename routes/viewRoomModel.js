const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.get("/:roomId", (req, res,next) => {
  try {
    const roomID = req.params.roomId;
    connection.query(`SELECT * FROM Rooms WHERE RoomID = ${roomID}`, (err,result) =>{
        console.log(result);
        if (err) throw err;
        else {
            if (result.length > 0) {
                return res.status(200).json(result[0]);
              } else {
                return res.status(404).json({ message: "Room not found" });
              }
        }
    })
    } catch (error) {
    console.error("Error fetching Room data:", error);
    return res.status(500).json({ message: "An error occurred" });
  }


});



module.exports = router;

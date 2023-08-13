const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.put('/:roomId', (req, response) => {
  const roomID = req.params.roomId;
  const updatedRoomData = req.body; 
  console.log();

  connection.query(`UPDATE Rooms SET ? WHERE RoomID = ${roomID}`,(updatedRoomData),(err, res) => {
      if (err) {
        console.error("Error updating Room:", err);
        response.status(500).json({ message: 'Error updating Room' });
      } else {
        console.log("Room updated successfully");
        response.sendStatus(200);
      }
    }
  );
});

module.exports = router;
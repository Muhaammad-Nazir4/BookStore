const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.delete('/:roomId', (req, res) => {
    const roomId = req.params.roomId;
    console.log("Room ID:", roomId);

    connection.query(`DELETE FROM Bookings WHERE RoomID = ${roomId}`, (error, result) => {
        if (error) throw error;
        else {
            connection.query(`DELETE FROM Rooms WHERE RoomID = ${roomId}`, (err, result) => {
                if (err) {
                    console.error("Error deleting Room:", err);
                    res.status(500).json({ message: 'Error deleting Room' });
                } else {
                    console.log("Room deleted successfully");
                    res.status(200).json({ message: 'Room deleted successfully' });
                }
            });
        }
    });
});

module.exports = router;

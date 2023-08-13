const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.get('/', (req, response, next) => {
    var userEmail = req.query.email;
    console.log(userEmail);

    connection.query('SELECT UserID FROM Users WHERE Email = ?', [userEmail], (error, result1) => {
        if (error) {
            console.error("Error querying database:", error);
            return response.status(500).json({ message: "Database Error" });
        }

        var userId;
        if (result1.length > 0) {
            userId = result1[0].UserID; // Retrieve the UserID from the result
            console.log("UserID:", userId);

            connection.query(`SELECT * from Bookings Join Rooms on Bookings.RoomID=Rooms.RoomID WHere BookingStatus='Approve' AND UserID=${userId}`, (err, res) => {
                if (err) throw err;
                else {
                    response.send(res);
                }
            });
        } else {
            console.log("No user found with the provided email.");
            return response.status(400).json({ message: "No user found with the provided email" });
        }
    });
});

module.exports = router;

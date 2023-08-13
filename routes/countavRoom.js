const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.get('/', (req, response) => {
    connection.query(`SELECT COUNT(*) AS totalRooms FROM Rooms Where AvailabilityStatus='Available'`, (err, res) => {
        if (err) {
            console.error("Error querying database:", err);
            return response.status(500).json({ message: "Database Error" });
        } else {
            response.json(res); // Return the count as JSON
        }
    });
});

module.exports = router;

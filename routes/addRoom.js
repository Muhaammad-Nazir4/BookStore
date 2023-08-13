const express = require("express");
const router = express.Router();
const multer = require("multer");
const { connection } = require("../database/sql");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("rPic"), async (req, res) => {
  try {
    const roomNumber = req.body.rNumber;
    const roomType = req.body.rType;
    const roomServantName = req.body.rServantName;
    const roomServantContact = req.body.rServantContact;
    const roomPrice = req.body.rPrice;
    const roomPic = req.file.filename;
    const roomDescription = req.body.rDescription;
    const roomStatus = req.body.rStatus;

    const data = {

        							
            RoomNo: roomNumber,
            RoomType: roomType,
            RoomServantName: roomServantName,
            ServantContact: roomServantContact,
            RoomPrice: roomPrice,
            RoomImage: roomPic,
            RoomDescription:roomDescription,
            AvailabilityStatus:roomStatus
    };

    await connection.query("INSERT into Rooms SET ?", data);
    
    console.log("Room Credentials saved in the database");
    return res.status(200).json({ message: "Room Added successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;

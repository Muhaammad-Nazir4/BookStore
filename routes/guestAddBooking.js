// const express = require("express");
// const router = express.Router();
// const { connection } = require("../database/sql");

// router.post("/", (req, res,next) => {
//   const userEmail = req.query.email;  //front end pe ajan
//     const roomId = req.query.id; 
//     const arDate= req.body.aDate;
//     const arTime= req.body.aTime;
//     const deDate= req.body.dDate;
//     const deTime= req.body.dTime;
//     const nChildren= req.body.gChildren;
//     const nAdult= req.body.gAdult;
//     const pName= req.body.gName;
//     const pEmail= req.body.gEmail;
//     const pContact= req.body.gContact;

//    console.log(userEmail,roomId);

//     connection.query(`Select UserID from Users Where  Email=${userEmail}`, data, (error, result1) => {
// // if (err) throw err;
// // else{
// var userId;
//   if (result1.length > 0) {
//     userId = result1[0].UserID; // Retrieve the UserID from the result
//     console.log("UserID:", userId);
//   }

//   const data = {

//     UserID: userId,
//     RoomID: roomId,					
//     ArrivalDate: arDate,
//     ArrivalTime: arTime,
//     DepartureDate:deDate,
//     DepartureTime: deTime,
//     NumChildren: nChildren,
//     NumAdults: nAdult,
//     PersonName: pName, 
//     PersonEmail: pEmail,
//     PersonContact:pContact,
// };
// console.log('UserID:' + userId, 'RoomID:' + roomId, 'Name:' + pName);
// console.log(data);
// connection.query("INSERT into Bookings SET ?", data, (err, result) => {
//   if (err) {
//     console.error("Error inserting data:", err);
//     return res.status(500).json({ message: "Database Error" });
//   } else {
//     console.log(result);
//     console.log("Booking Credentials saved in the database");
//     return res.status(200).json({ message: "Room Booked successfully" });
//   }
// });
// // }
//     })



// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.post("/", (req, res,next) => {
  var userEmail = req.query.email;
  const roomId = req.query.id;
  const arDate = req.body.arrivalDate;
  const arTime = req.body.arrivalTime;
  const deDate = req.body.departureDate;
  const deTime = req.body.departureTime;
  const nChildren = req.body.bookingChildren;
  const nAdult = req.body.bookingAdult;
  const pName = req.body.bookingName;
  const pEmail = req.body.bookingEmail;
  const pContact = req.body.bookingContact;

  console.log(userEmail, roomId);
  console.log("......................i am............");
  console.log(req.body.arrivalDate,req.body.bookingChildren);

  connection.query('SELECT UserID FROM Users WHERE Email = ?', [userEmail], (error, result1) => {
    if (error) {
      console.error("Error querying database:", error);
      return res.status(500).json({ message: "Database Error" });
    }

    var userId;
    if (result1.length > 0) {
      userId = result1[0].UserID; // Retrieve the UserID from the result
      console.log("UserID:", userId);
    } else {
      console.log("No user found with the provided email.");
      return res.status(400).json({ message: "No user found with the provided email" });
    }
      const data = {
        UserID: userId,
        RoomID: roomId,
        ArrivalDate: arDate,
        ArrivalTime: arTime,
        DepartureDate: deDate,
        DepartureTime: deTime,
        NumChildren: nChildren,
        NumAdults: nAdult,
        PersonName: pName,
        PersonEmail: pEmail,
        PersonContact: pContact,
      };

      console.log('UserID:' + userId, 'RoomID:' + roomId, 'Name:' + pName);
      console.log(data);

      connection.query("INSERT into Bookings SET ?", data, (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ message: "Database Error" });
        } else {
          console.log(result);
          console.log("Booking Credentials saved in the database");
          return res.status(200).json({ message: "Room Booked successfully" });
        }
      });
  });
});

module.exports = router;



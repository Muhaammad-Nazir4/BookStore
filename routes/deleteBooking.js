const express = require("express");
const router = express.Router();
const { transporter } = require("../nodemailer/nodemailer");
const { connection } = require("../database/sql");


router.delete('/', (req, response) => {
    // const bookingId = req.params.bookingId; 
    const bookingId = req.query.id; 
    const bookEmail=req.query.bemail;
    console.log(bookingId,bookEmail);
    console.log("Sending email to:", bookEmail);
    // console.log("Mail options:", mailOption);
    const mailOption = {
      from: `HotelEase <nazir1081ashraf@gmail.com>`,
      to: bookEmail,
      subject: "Booking is Rejected",
      html: `<p> Hy, Your Booking for room in HotelEase is rejected</p>`,
    };


  connection.query(`DELETE FROM Bookings WHERE BookingID = ${bookingId}`, (err, res) => {
    if (err) {
      console.error("Error deleting Booking:", err);
      response.status(500).json({ message: 'Error deleting Booking' });
    } else {
      console.log("Booking deleted successfully");

      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email Sent!");
        }
      });

      response.sendStatus(200);
    }
  });
});

module.exports = router;
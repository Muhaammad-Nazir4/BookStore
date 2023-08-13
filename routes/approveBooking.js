const express = require("express");
const router = express.Router();
const { transporter } = require("../nodemailer/nodemailer");
const { connection } = require("../database/sql");

router.put('/', (req, response) => {
    const bookingId = req.query.id; 
    const bookEmail=req.query.bemail;
    console.log(bookingId,bookEmail);
    console.log("Sending email to:", bookEmail);

    const mailOption = {
        from: `HotelEase <nazir1081ashraf@gmail.com>`,
        to: bookEmail,
        subject: "Booking is Approved",
        html: `<p> Hy, Your Booking for room in HotelEase is Approved. Please pay your dues as soon as possible.</p>`,
      };

  connection.query(`UPDATE Bookings SET BookingStatus = 'Approve' WHERE BookingID = ${bookingId}`,(err, res) => {
      if (err) {
        console.error("Error approving booking:", err);
        response.status(500).json({ message: 'Error approving booking' });
      } else {
        console.log("Booking Approved successfully");

        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email Sent!");
            }
          });

        response.sendStatus(200);
      }
    }
  );
});

module.exports = router;
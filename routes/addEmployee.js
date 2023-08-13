const express = require("express");
const router = express.Router();
const multer = require("multer");
const { transporter } = require("../nodemailer/nodemailer");
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

router.post("/", upload.single("ePic"), async (req, res) => {
  try {
    const empName = req.body.eName;
    const empPic = req.file.filename;
    const empCNIC = req.body.eCNIC;
    const empContact = req.body.eContact;
    const empEmail = req.body.eEmail;
    const empSalary = req.body.eSalary;

    const mailOption = {
      from: `Muhammad Nazir <nazir1081ashraf@gmail.com>`,
      to: empEmail,
      subject: "You are Selected",
      html: `<p> Hy Muhammad Nazir, You are Selected in as an employee in HotelEase.</p>`,
    };

    const data = {
      EmployeeName: empName,
      Image: empPic,
      CNIC: empCNIC,
      Contact: empContact,
      Email: empEmail,
      Salary: empSalary,
    };

    await connection.query("INSERT into Employees SET ?", data);
    
    console.log("Employee Credentials saved in the database");
    
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email Sent!");
      }
    });

    return res.status(200).json({ message: "Employee registered successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;

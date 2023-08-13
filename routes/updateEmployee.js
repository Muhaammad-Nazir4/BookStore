const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.put('/:employeeId', (req, response) => {
  const employeeId = req.params.employeeId;
  const updatedEmployeeData = req.body; // New employee data in the request body
  console.log();

  connection.query(`UPDATE Employees SET ? WHERE EmployeeID = ${employeeId}`,(updatedEmployeeData),(err, res) => {
      if (err) {
        console.error("Error updating employee:", err);
        response.status(500).json({ message: 'Error updating employee' });
      } else {
        console.log("Employee updated successfully");
        response.sendStatus(200);
      }
    }
  );
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { connection } = require("../database/sql");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/:employeeId", upload.single("Image"), async (req, res) => {
//     const employeeId = req.params.employeeId;
//   try {
//     const empName = req.body.EmployeeName;
//     const empPic = req.file.filename;
//     const empCNIC = req.body.CNIC;
//     const empContact = req.body.Contact;
//     const empEmail = req.body.Email;
//     const empSalary = req.body.Salary;


//     const updatedEmployeeData = {
//       EmployeeName: empName,
//       Image: empPic,
//       CNIC: empCNIC,
//       Contact: empContact,
//       Email: empEmail,
//       Salary: empSalary,
//     };

//   connection.query(`UPDATE Employees SET ? WHERE EmployeeID = ${employeeId}`,(updatedEmployeeData),(err, res) => {
//       if (err) {
//         console.error("Error updating employee:", err);
//         response.status(500).json({ message: 'Error updating employee' });
//       } else {
//         console.log("Employee updated successfully");
//         response.sendStatus(200);
//       }
//     }
//   );
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return res.status(500).json({ message: "An error occurred" });
//   }
// });

// module.exports = router;


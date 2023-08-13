const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.get("/:employeeId", (req, res,next) => {
  try {
    const employeeID = req.params.employeeId;
    connection.query(`SELECT * FROM Employees WHERE EmployeeID = ${employeeID}`, (err,result) =>{
        console.log(result);
        if (err) throw err;
        else {
            if (result.length > 0) {
                return res.status(200).json(result[0]);
              } else {
                return res.status(404).json({ message: "Employee not found" });
              }
        }
    })
    } catch (error) {
    console.error("Error fetching employee data:", error);
    return res.status(500).json({ message: "An error occurred" });
  }


});



module.exports = router;

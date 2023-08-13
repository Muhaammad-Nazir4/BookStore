const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");


router.delete('/:employeeId', (req, response) => {
    const employeeId = req.params.employeeId; 
    console.log(employeeId);
  connection.query(`DELETE FROM Employees WHERE EmployeeID = ${employeeId}`, (err, res) => {
    if (err) {
      console.error("Error deleting employee:", err);
      response.status(500).json({ message: 'Error deleting employee' });
    } else {
      console.log("Employee deleted successfully");
      response.sendStatus(200);
    }
  });
});

module.exports = router;
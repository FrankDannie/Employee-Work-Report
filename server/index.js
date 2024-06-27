const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "root",
  database: "userdb",
});
app.post("/create", (req, res) => {
    const EMPLOYEE_ID = req.body.EMPLOYEE_ID;
    const EMPLOYEE_NAMES = req.body.EMPLOYEE_NAMES;
    const TASK= req.body.TASK;
    const TASK_DATE = req.body.TASK_DATE;
    const DATE_UPDATE = req.body.DATE_UPDATE;

    db.query(
        "INSERT INTO employeedata (EMPLOYEE_ID, EMPLOYEE_NAMES, TASK, TASK_DATE, DATE_UPDATE) VALUES (?,?,?,?,?)",
        [EMPLOYEE_ID, EMPLOYEE_NAMES, TASK, TASK_DATE, DATE_UPDATE],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
});
app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employeedata", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
 
  app.put("/update", (req, res) => {
    const EMPLOYEE_ID = req.body.EMPLOYEE_ID;
    const TASK = req.body.TASK;
    db.query(
      "UPDATE employeedata SET TASK = ? WHERE EMPLOYEE_ID = ?",
      [TASK, EMPLOYEE_ID ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  app.delete("/delete/:EMPLOYEE_ID", (req, res) => {
    const EMPLOYEE_ID = req.params.EMPLOYEE_ID;
    db.query('DELETE FROM employeedata WHERE EMPLOYEE_ID = ?', EMPLOYEE_ID, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
app.listen(3001, () => {
    console.log("Connected to server 3001");
  });
  
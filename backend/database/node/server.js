import express from "express";
import con from "./connection.js";

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  con.query("SELECT * FROM funcionario", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


app.listen(3000, () => {
  console.log("Running Server on port 3030");
});

import mysql from "mysql";
// const bodyParser = require('body-parser');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trabalho_seguro",
});

con.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados!");
  }
});

export default con;

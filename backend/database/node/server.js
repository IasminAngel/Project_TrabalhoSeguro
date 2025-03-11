import express from "express";
import con from "./connection.js";

const app = express();

// Middleware para processar JSON
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

/*app.post("/inserir", (req, res) => {
  const { opinionField, upgradeField } = req.body;
  console.log("Recebido:", opinionField, upgradeField);
  
  if (!opinionField || !upgradeField) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  const sql = "INSERT INTO avaliacao_site (opiniao, melhoras) VALUES (?, ?)";
  
  con.query(sql, [opinionField, upgradeField], (err, result) => {
    if (err) {
      console.error("Erro ao inserir:", err); 
      res.status(500).send("Erro ao inserir dados");
    } else {
      console.log("Dados inseridos com sucesso!"); 
      res.send("Dados inseridos com sucesso!");
    }
  });
});*/

app.listen(3030, () => {
  console.log("Running Server on port 3030");
});

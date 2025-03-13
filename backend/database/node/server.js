import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trabalho_seguro",
});


connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});

app.post('/salvar-avaliacao', (req, res) => {
  const { estrela, opiniao, melhoras } = req.body;

  if (!estrela || !opiniao) {
      return res.status(400).json({ error: 'Avaliação e opinião são obrigatórios!' });
  }

  const query = 'INSERT INTO Avaliacao_site (estrela, opiniao, melhoras) VALUES (?, ?, ?)';
  connection.query(query, [estrela, opiniao, melhoras], (err, results) => {
      if (err) {
          console.error('Erro ao salvar dados:', err);
          return res.status(500).json({ error: 'Erro ao salvar dados no banco de dados.' });
      }

      res.status(201).json({ message: 'Avaliação salva com sucesso!', id: results.insertId });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

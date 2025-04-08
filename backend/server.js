import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuração correta para arquivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rota principal corrigida
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
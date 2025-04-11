import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Rota principal
router.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Rotas específicas
router.get('/avaliacao', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/ava/form_ava.html'));
});

router.get('/biografia', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/bio/sobre_nos.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/login/login.html'));
});

// Rota genérica para outras páginas
router.get('/:page', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', `${req.params.page}.html`));
});

export default router;
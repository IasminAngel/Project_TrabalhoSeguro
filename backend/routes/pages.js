import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/avaliacao', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/avaliar.html'));
});

router.get('/biografia', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/biografia.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/login/login.html'));
});

router.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/login/registro.html'));
});

router.get('/senha', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/login/senha.html'));
});

// Rota genérica para outras páginas
router.get('/:page', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', `${req.params.page}.html`));
});

export default router;
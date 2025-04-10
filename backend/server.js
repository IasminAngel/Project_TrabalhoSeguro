import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/api.js';
import pagesRouter from './routes/pages.js'; // Unifique todas as rotas de páginas aqui

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurações
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rotas API
app.use('/routes/api', userRouter);
app.use('/routes/pages', userRouter);

// Rotas de páginas (unificadas)
app.use('/', pagesRouter);

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
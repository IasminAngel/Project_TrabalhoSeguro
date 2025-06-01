import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";
import apiRouter from "./routes/api.js";
import pagesRouter from "./routes/pages.js";
import { paths, frontendPaths } from './config/paths.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurações básicas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Compartilhamento de paths
app.locals.paths = paths;
app.locals.frontendPaths = frontendPaths;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rotas estáticas
app.use(express.static(path.join(__dirname, "../public")));

// Rotas da API
app.use("/api", apiRouter);

// Rotas de páginas
app.use("/", pagesRouter);

// Rota para paths.js
app.get('/scripts/paths.js', (req, res) => {
  res.type('application/javascript').send(`
    window.paths = ${JSON.stringify(paths)};
    window.frontendPaths = {
      css: function(key) {
        return window.paths.css.files[key] 
          ? '<link rel="stylesheet" href="' + window.paths.css.base + '/' + window.paths.css.files[key] + '">'
          : '';
      },
      js: function(key) {
        return window.paths.js.files[key]
          ? '<script src="' + window.paths.js.base + '/' + window.paths.js.files[key] + '"></script>'
          : '';
      },
      img: function(type, key) {
        const filePath = window.paths.imgs[type]?.[key];
        return filePath ? window.paths.imgs.base + '/' + filePath : '';
      },
      icon: function(name) {
        const file = window.paths.icons.files[name];
        return file ? window.paths.icons.base + '/' + file : '';
      }
    };
  `);
});

// Rotas de assets
app.get('/assets/icons/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assets/icons', req.params.file), {
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  });
});

app.get('/assets/imgs/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assets/imgs', req.params.file));
});

app.get('/assets/js/:file', (req, res) => {
  const file = req.params.file;
  res.sendFile(path.join(__dirname, '../public/assets/js', file), {
    headers: {
      'Content-Type': 'application/javascript'
    }
  });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Erro interno no servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : null
  });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
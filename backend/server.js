import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiRouter from "./routes/api.js"; // Renomeei para apiRouter
import pagesRouter from "./routes/pages.js";
import { paths, frontendPaths } from './config/paths.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.locals.paths = paths;
app.locals.frontendPaths = frontendPaths;


app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", apiRouter); 

app.use("/", pagesRouter);

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

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Teste o CSS em: http://localhost:3000/assets/css/style.css");
  
});
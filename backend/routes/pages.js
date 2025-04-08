import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/avaliacao", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "pages", "ava", "form_ava.html")
  );
});

router.get("/biografia", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "pages", "bio", "sobre_nos.html")
  );
});

router.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "pages", "login", "login.html")
  );
});

router.get("/pages/:folder/:file", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "public",
      "pages",
      req.params.folder,
      req.params.file
    )
  );
});

export default router;

import express from "express";
import { query } from "../database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.use(express.json());

router.post("/avaliacoes", async (req, res) => {
  console.log("Dados recebidos:", req.body);

  try {
    const { estrela, opiniao, melhoras } = req.body;

    if (estrela < 1 || estrela > 5) {
      return res
        .status(400)
        .json({ error: "Avaliação deve ser entre 1 e 5 estrelas" });
    }

    const result = await query(
      "INSERT INTO Avaliacao_site (estrela, opiniao, melhoras) VALUES (?, ?, ?)",
      [estrela, opiniao, melhoras || null]
    );

    console.log("Resultado:", result);
    res.status(201).json({
      success: true,
      message: "Avaliação salva com sucesso!",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Erro detalhado:", error);
    res.status(500).json({
      success: false,
      error: "Erro no servidor",
      details: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
});

router.post("/cadastrar", async (req, res) => {
  console.log("Dados recebidos:", req.body);

  try {
    const { nome, sobrenome, email, celular, senha } = req.body;

    if (!nome || !sobrenome || !email || !celular || !senha) {
      return res.status(400).json({
        success: false,
        error: "Todos os campos são obrigatórios",
      });
    }

    const [usuarioExistente] = await query(
      "SELECT idCadastro FROM cadastro WHERE email = ?",
      [email]
    );

    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        error: "Email já cadastrado",
      });
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);
    console.log("Senha original:", senha);
    console.log("Hash gerado:", senhaHash);

    const result = await query(
      `INSERT INTO cadastro 
       (nome, sobrenome, email, celular, senha) 
       VALUES (?, ?, ?, ?, ?)`,
      [nome, sobrenome, email, celular, senhaHash]
    );
    console.log("Dados inseridos:", [
      nome,
      sobrenome,
      email,
      celular,
      senhaHash,
    ]);

    if (result.affectedRows === 1) {
      return res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso!",
        userId: result.insertId,
      });
    } else {
      throw new Error("Falha ao inserir usuário");
    }
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({
      success: false,
      error: "Erro no servidor",
      details: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        error: "Email e senha são obrigatórios",
      });
    }

    let user;
    try {
      [user] = await query(
        `SELECT idCadastro as id, nome as name, email, senha as password 
         FROM cadastro 
         WHERE email = ? LIMIT 1`,
        [email.trim().toLowerCase()]
      );
    } catch (dbError) {
      console.error("Erro ao buscar usuário:", dbError);
      return res.status(500).json({
        success: false,
        error: "Erro ao acessar o banco de dados",
      });
    }

    if (!user) {
      console.log("Usuário não encontrado para:", email);
      return res.status(401).json({
        success: false,
        error: "Credenciais inválidas",
      });
    }

    let passwordMatch;
    try {
      passwordMatch = await bcrypt.compare(password, user.password);
      console.log("Resultado da comparação:", passwordMatch);
    } catch (bcryptError) {
      console.error("Erro ao comparar senhas:", bcryptError);
      return res.status(500).json({
        success: false,
        error: "Erro ao verificar credenciais",
      });
    }

    if (!passwordMatch) {
      console.log("Senha incorreta para:", email);
      return res.status(401).json({
        success: false,
        error: "Credenciais inválidas",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "24h" }
    );

    console.log("Login bem-sucedido para:", user.email);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro geral no login:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno no servidor",
    });
  }
});

router.post("/acidentes", async (req, res) => {
  console.log("Dados recebidos:", req.body);

  try {
    const {
      dataAcidente,
      local,
      matricula,
      agente,
      acidentes_anteriores,
      quantidadeAcidentes,
      confirmacao_testemunha,
      testemunhaInfo,
      afastamento,
      diasAfastamento,
      turno,
      periodo,
      cat,
      fratura,
      descricao,
      uso_epi,
      epiUtilizado,
    } = req.body;

    const requiredFields = [
      "dataAcidente",
      "local",
      "matricula",
      "agente",
      "descricao",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Campos obrigatórios faltando",
        missingFields,
      });
    }

    // Validação de tipos
    if (isNaN(new Date(dataAcidente).getTime())) {
      return res.status(400).json({
        success: false,
        error: "Data do acidente inválida",
      });
    }

    const acidenteData = {
      data_acidente: new Date(`${dataAcidente}T00:00:00`),
      local,
      matricula,
      agente,
      acidentes_anteriores: acidentes_anteriores === "sim",
      quantidade_acidentes:
        acidentes_anteriores === "sim" ? parseInt(quantidadeAcidentes) || 1 : 1,
      confirmacao_testemunha: confirmacao_testemunha === "sim",
      testemunha_info: confirmacao_testemunha === "sim" ? testemunhaInfo : null,
      afastamento: afastamento === "sim",
      dias_afastamento:
        afastamento === "sim" ? parseInt(diasAfastamento) || 0 : 0,
      turno,
      periodo,
      cat: cat !== "nao",
      fratura: fratura === "sim",
      descricao,
      uso_epi: uso_epi === "sim",
      epi_utilizado: epiUtilizado || null,
    };

    const result = await query(
      `INSERT INTO acidente_incidente 
  (
    data_acidente,
    local,
    matricula,
    agente,
    acidentes_anteriores,
    quantidade_acidentes,
    confirmacao_testemunha,
    testemunha_info,
    afastamento,
    dias_afastamento,
    turno,
    periodo,
    cat,
    fratura,
    descricao,
    uso_epi,
    epi_utilizado
  ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        acidenteData.data_acidente,
        acidenteData.local,
        acidenteData.matricula,
        acidenteData.agente,
        acidenteData.acidentes_anteriores,
        acidenteData.quantidade_acidentes,
        acidenteData.confirmacao_testemunha,
        acidenteData.testemunha_info,
        acidenteData.afastamento,
        acidenteData.dias_afastamento,
        acidenteData.turno,
        acidenteData.periodo,
        acidenteData.cat,
        acidenteData.fratura,
        acidenteData.descricao,
        acidenteData.uso_epi,
        acidenteData.epi_utilizado,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Acidente registrado com sucesso!",
      id: result.insertId,
      data: acidenteData,
    });
  } catch (error) {
    console.error("Erro detalhado:", error);

    if (error.code === "ER_NO_SUCH_TABLE") {
      return res.status(500).json({
        success: false,
        error: "Tabela de acidentes não encontrada",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      });
    }

    res.status(500).json({
      success: false,
      error: "Erro no servidor ao registrar acidente",
      details: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
});

router.post("/alterar-senha", async (req, res) => {
  console.log("Endpoint /alterar-senha chamado"); // Debug

  try {
    // Debug dos headers
    console.log("Headers recebidos:", req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Token não enviado");
      return res.status(401).json({
        success: false,
        error: "Token não fornecido",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("Formato do token inválido");
      return res.status(401).json({
        success: false,
        error: "Formato do token inválido",
      });
    }

    console.log("Token recebido:", token); // Debug

    // Decodifica o token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
      console.log("Token decodificado:", decoded); // Debug
    } catch (err) {
      console.error("Erro na verificação do token:", err);
      return res.status(401).json({
        success: false,
        error: "Token inválido",
        details: process.env.NODE_ENV === "development" ? err.message : null,
      });
    }

    const { email, novaSenha } = req.body;
    if (!email || !novaSenha) {
      return res.status(400).json({
        success: false,
        error: "Email e senha são obrigatórios",
      });
    }

    // Verifica correspondência do email
    if (decoded.email !== email.toLowerCase().trim()) {
      return res.status(403).json({
        success: false,
        error: "Não autorizado",
      });
    }

    // Atualiza a senha
    const senhaHash = await bcrypt.hash(novaSenha, 10);
    const result = await query(
      "UPDATE cadastro SET senha = ? WHERE email = ?",
      [senhaHash, email.toLowerCase().trim()]
    );

    if (result.affectedRows !== 1) {
      throw new Error("Falha na atualização");
    }

    return res.json({
      success: true,
      message: "Senha alterada com sucesso",
    });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return res.status(500).json({
      success: false,
      error: "Erro interno",
      details: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
});

router.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

router.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: "Refresh token não fornecido",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET || "refresh_secret"
    );

    const [user] = await query(
      "SELECT idCadastro, email FROM cadastro WHERE idCadastro = ?",
      [decoded.id]
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Usuário não encontrado",
      });
    }

    const newToken = jwt.sign(
      { id: user.idCadastro, email: user.email },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1h" }
    );

    return res.json({ success: true, token: newToken });
  } catch (error) {
    console.error("Erro ao renovar token:", error);
    return res.status(401).json({
      success: false,
      error: "Refresh token inválido ou expirado",
    });
  }
});

export default router;

// SEM O BCRYPT

/*import express from 'express';
import { query } from '../database.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// AVALIAÇÃO 
router.post('/avaliacoes', async (req, res) => {
  console.log('Dados recebidos:', req.body);

  try {
    const { estrela, opiniao, melhoras } = req.body;

    if (estrela < 1 || estrela > 5) {
      return res.status(400).json({ error: 'Avaliação deve ser entre 1 e 5 estrelas' });
    }

    const result = await query(
      'INSERT INTO Avaliacao_site (estrela, opiniao, melhoras) VALUES (?, ?, ?)',
      [estrela, opiniao, melhoras || null]
    );

    console.log('Resultado:', result);
    res.status(201).json({
      success: true,
      message: 'Avaliação salva com sucesso!',
      id: result.insertId
    });

  } catch (error) {
    console.error('Erro detalhado:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro no servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

router.post('/cadastrar', async (req, res) => {
  console.log('Dados recebidos:', req.body);

  try {
    const { nome, sobrenome, email, celular, senha } = req.body;

    if (!nome || !sobrenome || !email || !celular || !senha) {
      return res.status(400).json({ 
        success: false,
        error: 'Todos os campos são obrigatórios' 
      });
    }

    const [usuarioExistente] = await query(
      'SELECT idCadastro FROM cadastro WHERE email = ?', 
      [email]
    );

    if (usuarioExistente) {
      return res.status(400).json({ 
        success: false,
        error: 'Email já cadastrado' 
      });
    }

    const result = await query(
      `INSERT INTO cadastro 
       (nome, sobrenome, email, celular, senha) 
       VALUES (?, ?, ?, ?, ?)`,
      [nome, sobrenome, email, celular, senha]
    );
    console.log('Dados inseridos:', [nome, sobrenome, email, celular, senha]);

    if (result.affectedRows === 1) {
      return res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso!',
        userId: result.insertId
      });
    } else {
      throw new Error('Falha ao inserir usuário');
    }

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro no servidor',
      details: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email e senha são obrigatórios' 
      });
    }

    let user;
    try {
      [user] = await query(
        `SELECT idCadastro as id, nome as name, email, senha as password 
         FROM cadastro 
         WHERE email = ? LIMIT 1`,
        [email.trim().toLowerCase()]
      );
    } catch (dbError) {
      console.error('Erro ao buscar usuário:', dbError);
      return res.status(500).json({ 
        success: false,
        error: 'Erro ao acessar o banco de dados' 
      });
    }

    if (!user) {
      console.log('Usuário não encontrado para:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Credenciais inválidas' 
      });
    }

    if (password !== user.password) {
      console.log('Senha incorreta para:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Credenciais inválidas' 
      });
    }

    // Geração do token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email 
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    );

    console.log('Login bem-sucedido para:', user.email);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Erro geral no login:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro interno no servidor'
    });
  }
});*/

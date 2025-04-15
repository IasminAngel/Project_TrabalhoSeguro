import express from 'express';
import { query } from '../database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();


// AVALIACAO 
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

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const result = await query(
      `INSERT INTO cadastro 
       (nome, sobrenome, email, celular, senha) 
       VALUES (?, ?, ?, ?, ?)`,
      [nome, sobrenome, email, celular, senhaHash]
    );

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

      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação melhorada
    if (!email?.trim() || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email e senha são obrigatórios' 
      });
    }

    // Busca otimizada no banco
    const [user] = await query(
      `SELECT idCadastro as id, nome as name, email, senha as password 
       FROM cadastro 
       WHERE email = ? LIMIT 1`,
      [email.trim().toLowerCase()]
    );

    if (!user) {
      console.log('Usuário não encontrado para:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Credenciais inválidas' 
      });
    }

    // Comparação segura de senhas
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
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
    console.error('Erro no login:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro interno no servidor'
    });
  }
});
export default router;
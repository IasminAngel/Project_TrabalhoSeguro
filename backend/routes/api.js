import express from 'express';
import { query } from '../sql/database.js';
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

    // Verifica se o email já existe
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

    // Criptografa a senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Insere no banco de dados
    const result = await query(
      `INSERT INTO cadastro 
       (nome, sobrenome, email, celular, senha) 
       VALUES (?, ?, ?, ?, ?)`,
      [nome, sobrenome, email, celular, senhaHash]
    );

    // Verifica se a inserção foi bem-sucedida
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
      // Mostra detalhes apenas em desenvolvimento
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

export default router;
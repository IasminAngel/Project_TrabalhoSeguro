import express from 'express';
import { query } from '../sql/database.js';

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

export default router;
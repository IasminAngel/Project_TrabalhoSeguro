import User from '../models/user.model.js';
import { generateToken } from '../services/auth.service.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = generateToken(user);
    res.json({ success: true, token });
  } catch (error) {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
};
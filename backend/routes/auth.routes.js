// backend/routes/auth.routes.js
import express from 'express';
import { login, register, resetPassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/reset-password', resetPassword);

export default router;
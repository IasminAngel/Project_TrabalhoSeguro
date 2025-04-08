// backend/routes/evaluation.routes.js
import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { createEvaluation } from '../controllers/evaluation.controller.js';

const router = express.Router();

router.post('/', authenticate, createEvaluation);

export default router;
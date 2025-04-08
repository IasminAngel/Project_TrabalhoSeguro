import express from 'express';
import path from 'path';
import authRouter from './routes/auth.routes.js';
import evaluationRouter from './routes/evaluation.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(express.static('../public'));

// Rotas
app.use('/auth', authRouter);
app.use('/api/evaluations', evaluationRouter);
app.use('/api/users', userRouter);

app.get('/:page', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages', `${req.params.page}.html`));
});

app.listen(3000, () => console.log('Servidor rodando'));
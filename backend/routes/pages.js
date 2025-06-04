import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/avaliacao', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/landing/avaliar.html'));
});

router.get('/biografia', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/landing/biografia.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/login/login.html'));
});

router.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/login/registro.html'));
});

router.get('/senha', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/login/senha.html'));
});

router.get('/pagament', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/landing/pagament.html'));
});

router.get('/aplicacao', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/aplicacao/selection.html'));
});

router.get('/formularios', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/registros/index_formularios.html'));
});

router.get('/acidente_incidente', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/registros/acidente_incidente.html'));
});

router.get('/desvios', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/registros/index_desvios.html'));
});

router.get('/registers', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/registros/index_registers.html'));
});

router.get('/check', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/screenCheck/index_check.html'));
});

router.get('/epis', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/episCheck/index_epis.html'));
});

router.get('/employee', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/profile/index_employee.html'));
});

router.get('/nova_empresa', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/Registro_empresa/pages/cadastro_empresa.html'));
});

router.get('/nova_empresa_dois', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/Registro_empresa/pages/cadastro_empresa_pdois.html'));
});

router.get('/download', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/downloadScreen/index_download.html'));
});

router.get('/setor', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/setor/funcionarios_setor.html'));
});

router.get('/funcionarios', (req, res)=> {
  res.sendFile(path.join(__dirname, '../../public/pages/funcionarios/funcionarios.html'));
});

router.get('/exibir_funcionarios', (req, res)=> {
   res.sendFile(path.join(__dirname, '../../public/pages/funcionarios/vizualizar_funcionario.html'));
});

router.get('/add_setor', (req, res)=> {
  res.sendFile(path.join(__dirname, '../../public/pages/setor/adicionar_setor.html'));
});

router.get('/epis_view', (req, res)=>{
  res.sendFile(path.join(__dirname, '../../public/pages/Epis_pages/epis_geral.html'));
});

router.get('/epis_especifico', (req, res)=>{
  res.sendFile(path.join(__dirname, '../../public/pages/Epis_pages/epis_especifico.html'));
});


// Rota coringa para qualquer outro arquivo .html dentro de public
// router.get('/:page', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public', `${req.params.page}.html`));
// });

export default router;

// Seleciona elementos do DOM
const btnSave = document.getElementById('btn_save_setor');
const tableBody = document.querySelector('#setor-table tbody');

function carregarSetores() {
  const setores = JSON.parse(localStorage.getItem('setores')) || [];
  tableBody.innerHTML = ''; // limpa tabela

  setores.forEach(({ nome, descricao, tecnico, data }, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${nome}</td>
      <td>${descricao}</td>
      <td>${tecnico}</td>
      <td>${data}</td>
      <td><button class="btn-excluir" data-index="${index}">Excluir</button></td>
    `;
    tableBody.appendChild(tr);
  });

  // Adiciona evento para os botões excluir
  const btnsExcluir = document.querySelectorAll('.btn-excluir');
  btnsExcluir.forEach(btn => {
    btn.addEventListener('click', excluirSetor);
  });
}

function salvarSetor() {
  const nome = document.getElementById('setor_name').value.trim();
  const descricao = document.getElementById('setor_description').value.trim();
  const tecnico = document.getElementById('setor_technic').value.trim();
  const data = document.getElementById('setor_date').value;

  if (!nome || !descricao || !tecnico || !data) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const setores = JSON.parse(localStorage.getItem('setores')) || [];
  setores.push({ nome, descricao, tecnico, data });
  localStorage.setItem('setores', JSON.stringify(setores));

  carregarSetores();
  limparCampos();
}

function limparCampos() {
  document.getElementById('setor_name').value = '';
  document.getElementById('setor_description').value = '';
  document.getElementById('setor_technic').value = '';
  document.getElementById('setor_date').value = '';
}

function excluirSetor(event) {
  const index = event.target.getAttribute('data-index');
  let setores = JSON.parse(localStorage.getItem('setores')) || [];

  setores.splice(index, 1); // Remove o setor pelo índice
  localStorage.setItem('setores', JSON.stringify(setores));

  carregarSetores(); // Recarrega a tabela atualizada
}

btnSave.addEventListener('click', salvarSetor);

// Carrega lista ao abrir a página
carregarSetores();

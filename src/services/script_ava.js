document.addEventListener('DOMContentLoaded', function() {
  const stars = document.querySelectorAll('.star-icon');
  const form = document.getElementById('form');
  const sendButton = document.getElementById('send');
  const opinionField = document.querySelector('.opinion');
  const upgradeField = document.querySelector('.upgrade');
  const errorDiv = document.getElementById('error-message');
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  
  let selectedRating = 0;

  // Sistema de seleção de estrelas melhorado
  stars.forEach(star => {
    star.addEventListener('click', function() {
      selectedRating = parseInt(this.getAttribute('data-avaliacao'));
      
      // Atualiza visualização
      stars.forEach((s, i) => {
        if (i < selectedRating) {
          s.classList.add('ativo');
        } else {
          s.classList.remove('ativo');
        }
      });
    });
  });

  // Validação em tempo real
  opinionField.addEventListener('input', function() {
    if (this.value.trim() !== '') {
      this.style.border = '';
      errorDiv.style.display = 'none';
    }
  });

  // Envio do formulário
  function handleSubmit(e) {
    e.preventDefault();
    
    let errorMessage = '';
    
    // Validação
    if (selectedRating === 0) {
      errorMessage += 'Por favor, selecione uma avaliação com as estrelas.<br>';
    }
    
    if (!opinionField.value.trim()) {
      errorMessage += 'Por favor, preencha sua opinião.<br>';
      opinionField.style.border = '1px solid red';
    }
    
    if (errorMessage) {
      errorDiv.innerHTML = errorMessage;
      errorDiv.style.display = 'block';
      setTimeout(() => errorDiv.style.display = 'none', 4000);
      return;
    }
    
    // Preparar dados para envio
    const formData = {
      estrela: selectedRating,
      opiniao: opinionField.value.trim(),
      melhoras: upgradeField.value.trim() || null
    };
    
    console.log('Enviando dados:', formData); // Para debug

    fetch('http://localhost:3000/salvar-avaliacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        showPopup('Avaliação enviada com sucesso!');
        // Reset form
        stars.forEach(star => star.classList.remove('ativo'));
        opinionField.value = '';
        upgradeField.value = '';
        selectedRating = 0;
      } else {
        throw new Error(data.error || 'Erro desconhecido');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      errorDiv.innerHTML = `Erro ao enviar: ${error.message}`;
      errorDiv.style.display = 'block';
      setTimeout(() => errorDiv.style.display = 'none', 4000);
    });
  }

  // Adiciona listeners
  form.addEventListener('submit', handleSubmit);
  sendButton.addEventListener('click', handleSubmit);

  // Mostrar popup
  function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'flex';
    
    document.getElementById('closeBtn').onclick = function() {
      popup.style.display = 'none';
      window.location.href = '/index.html';
    };
    
    window.onclick = function(event) {
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    };
  }
});
// Seleciona todos os elementos com a classe .dish (representando cada prato) e itera sobre cada um deles
document.querySelectorAll('.dish').forEach(dish => {
    // Para cada prato, encontra os botões para abrir e fechar o vídeo, além do container do vídeo
    const openButton = dish.querySelector('.openVideo'); // Botão para abrir o vídeo
    const closeButton = dish.querySelector('.closeVideo'); // Botão para fechar o vídeo
    const videoContainer = dish.querySelector('.videoContainer'); // Container que contém o vídeo

    // Adiciona um evento de clique no botão de abrir vídeo
    openButton.addEventListener('click', () => {
        // Remove a classe 'hidden' do container de vídeo, tornando-o visível
        videoContainer.classList.remove('hidden');
    });

    // Adiciona um evento de clique no botão de fechar vídeo
    closeButton.addEventListener('click', () => {
        // Adiciona a classe 'hidden' ao container de vídeo, ocultando-o
        videoContainer.classList.add('hidden');
    });
});

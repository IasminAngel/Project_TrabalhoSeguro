document.querySelectorAll('.dish').forEach(dish => {
    const openButton = dish.querySelector('.openVideo');
    const closeButton = dish.querySelector('.closeVideo');
    const videoContainer = dish.querySelector('.videoContainer');

    openButton.addEventListener('click', () => {
        videoContainer.classList.remove('hidden');
    });

    closeButton.addEventListener('click', () => {
        videoContainer.classList.add('hidden');
    });
});

const gallery = document.getElementById('gallery');
const addImageBtn = document.getElementById('addImageBtn');

// Cargar imágenes desde localStorage al cargar la página
window.onload = function() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(image => {
        addImageToGallery(image.url, image.description);
    });
};

addImageBtn.addEventListener('click', function() {
    const imageUrl = document.getElementById('imageUrl').value;
    const imageDescription = document.getElementById('imageDescription').value;

    if (imageUrl && imageDescription) {
        addImageToGallery(imageUrl, imageDescription);
        saveImageToLocalStorage(imageUrl, imageDescription);
        document.getElementById('imageUrl').value = '';
        document.getElementById('imageDescription').value = '';
    } else {
        alert('Por favor, completa ambos campos.');
    }
});

// Función para agregar una imagen a la galería
function addImageToGallery(url, description) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const img = document.createElement('img');
    img.src = url;
    img.alt = description;

    const desc = document.createElement('div');
    desc.classList.add('image-description');
    desc.innerText = description;

    // Botón para eliminar la imagen
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Eliminar';
    deleteBtn.classList.add('delete-button');
    deleteBtn.onclick = function() {
        if (confirm("¿Estás seguro de que deseas eliminar esta imagen?")) {
            gallery.removeChild(imageContainer);
            removeImageFromLocalStorage(url, description);
        }
    };

    // Asegurarse de que la descripción no sobresalga
    imageContainer.appendChild(img);
    imageContainer.appendChild(desc);
    imageContainer.appendChild(deleteBtn);
    gallery.appendChild(imageContainer);
}
// Función para eliminar la imagen de localStorage
function removeImageFromLocalStorage(url, description) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images = images.filter(image => image.url !== url || image.description !== description); // Filtra la imagen a eliminar
    localStorage.setItem('images', JSON.stringify(images)); // Guarda el nuevo array
}



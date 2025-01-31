<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Álbum de Fotos</title>
  <style>
    #album {
      display: flex;
      flex-wrap: wrap;
    }
    .photo {
      margin: 10px;
      width: 150px;
      height: 150px;
      object-fit: cover;
    }
  </style>
</head>
<body>
  <h1>Álbum de Fotos</h1>

  <!-- Formulario para agregar imagen -->
  <input type="file" id="upload" accept="image/*">
  <button id="addImageBtn">Agregar Imagen</button>

  <div id="album"></div>

  <script>
    // Función para cargar las imágenes del localStorage
    function loadImages() {
      let images = JSON.parse(localStorage.getItem('images')) || [];
      const album = document.getElementById('album');
      album.innerHTML = '';  // Limpiar el album antes de cargar las imágenes

      // Mostrar las imágenes
      images.forEach(function(imageURL) {
        let img = document.createElement('img');
        img.src = imageURL;
        img.classList.add('photo');
        album.appendChild(img);
      });
    }

    // Función para agregar una nueva imagen
    document.getElementById('addImageBtn').addEventListener('click', function() {
      const fileInput = document.getElementById('upload');
      const file = fileInput.files[0];

      if (file) {
        // Crear una URL para la imagen cargada
        const reader = new FileReader();
        reader.onload = function(e) {
          let imageURL = e.target.result; // La imagen en formato base64

          // Recuperar las imágenes existentes
          let images = JSON.parse(localStorage.getItem('images')) || [];

          // Agregar la nueva imagen
          images.push(imageURL);

          // Guardar las imágenes en localStorage
          localStorage.setItem('images', JSON.stringify(images));

          // Cargar las imágenes nuevamente
          loadImages();
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor selecciona una imagen');
      }
    });

    // Cargar las imágenes al inicio
    window.onload = loadImages;
  </script>
</body>
</html>

const AUTH_CODE = "Ivan040908!"; // Cambia esto por tu código de acceso

function authenticate() {
    const userInput = prompt("Introduce el código de acceso:");
    if (userInput === AUTH_CODE) {
        toggleUploadForm();
    } else {
        alert("Código incorrecto");
    }
}

function toggleUploadForm() {
    const uploadContainer = document.getElementById('uploadContainer');
    if (uploadContainer.style.display === "none") {
        uploadContainer.style.display = "block";
        document.querySelectorAll('.delete-btn').forEach(btn => btn.style.display = 'block');
    } else {
        uploadContainer.style.display = "none";
        document.querySelectorAll('.delete-btn').forEach(btn => btn.style.display = 'none');
    }
}

function addImage() {
    const imageUpload = document.getElementById('imageUpload');
    const winnerName = document.getElementById('winnerName').value;
    const winnerLink = document.getElementById('winnerLink').value;

    if (imageUpload.files && imageUpload.files[0] && winnerName && winnerLink) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = {
                src: e.target.result,
                name: winnerName,
                link: winnerLink,
                id: Date.now() // Usamos una marca de tiempo como ID único
            };
            saveImage(imageData);
            displayImage(imageData);
        }
        reader.readAsDataURL(imageUpload.files[0]);
        
        // Clear inputs after adding the image
        document.getElementById('imageUpload').value = '';
        document.getElementById('winnerName').value = '';
        document.getElementById('winnerLink').value = '';
    } else {
        alert('Por favor, sube una imagen y proporciona el nombre y el enlace del ganador.');
    }
}

function saveImage(imageData) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.push(imageData);
    localStorage.setItem('images', JSON.stringify(images));
}

function loadImages() {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(imageData => {
        displayImage(imageData);
    });
}

function displayImage(imageData) {
    const gallery = document.getElementById('gallery');
    
    const div = document.createElement('div');
    div.classList.add('gallery-item');
    div.dataset.id = imageData.id;

    const img = document.createElement('img');
    img.src = imageData.src;
    div.appendChild(img);

    const a = document.createElement('a');
    a.href = imageData.link;
    a.textContent = imageData.name;
    a.target = "_blank";
    div.appendChild(a);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Borrar';
    deleteBtn.onclick = () => deleteImage(imageData.id);
    deleteBtn.style.display = 'none'; // Ocultar el botón de borrar por defecto
    div.appendChild(deleteBtn);

    gallery.appendChild(div);
}

function deleteImage(id) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images = images.filter(image => image.id !== id);
    localStorage.setItem('images', JSON.stringify(images));
    document.querySelector(`.gallery-item[data-id='${id}']`).remove();
}

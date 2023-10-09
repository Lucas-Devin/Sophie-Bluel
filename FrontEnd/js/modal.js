const categories = []

function createElementWithClasses(tagName, classes) {
  const element = document.createElement(tagName);
  element.classList.add(...classes);
  return element;
  //fonction permettant d'éviter d'écrire classList.add à chaque fois
}
// Fonction pour fermer la modale
function closeModal() {
  const modalOpen = document.getElementById('modal');
  modalOpen.style.display = 'none';
  resetModalState();
  window.removeEventListener('click', closeModal);
}
// Fonction pour ouvrir la deuxième modale
function openSecondModal() {
  const modalContent = document.querySelector('.modalContent');
  const addPhotoModal = document.querySelector('.modalContentPhoto');
  const modalPhotoBoxEmptyForm = document.querySelector('.modalPhotoBoxForm');

  modalContent.style.display = 'none';
  addPhotoModal.style.display = 'block';
}
// Fonction pour réinitialiser l'état des modales
function resetModalState() {
  const modalContent = document.querySelector('.modalContent');
  const addPhotoModal = document.querySelector('.modalContentPhoto');
  const modalPhotoBoxEmptyForm = document.querySelector('.modalPhotoBoxForm');
  modalContent.style.display = 'block';
  addPhotoModal.style.display = 'none';
  modalPhotoBoxEmptyForm.reset();
}
/*function createGalleryElement() {
  const token = localStorage.getItem('token');
  // Appel à l'API pour poster images
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
    })
  })
}*/

// Appel à l'API
fetch('http://localhost:5678/api/works')
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (works) {

    const modalOpen = document.getElementById('modal');
    const modalContent = createElementWithClasses('div', ['modalContent']);

    const modalCloseCross = createElementWithClasses('p', ['modalCloseCross']);
    modalCloseCross.textContent = 'x';
    modalCloseCross.addEventListener('click', closeModal);

    const modalTitle = createElementWithClasses('p', ['modalTitle']);
    modalTitle.textContent = 'Galerie Photo';

    const decoElement = createElementWithClasses('div', ['deco']);

    const addPhotoButton = createElementWithClasses('button', ['addPhotoButton']);
    addPhotoButton.textContent = 'Ajouter une photo';
    addPhotoButton.addEventListener('click', openSecondModal);
    modalContent.appendChild(addPhotoButton);

    const deleteWord = createElementWithClasses('p', ['deleteWord']);
    deleteWord.textContent = 'Supprimer la galerie';

    modalOpen.appendChild(modalContent);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalCloseCross);
    modalContent.appendChild(decoElement);
    modalContent.appendChild(deleteWord);
    modalContent.appendChild(addPhotoButton);

    const miniGallery = createElementWithClasses('div', ['miniGallery']);
    modalContent.appendChild(miniGallery);

    works.forEach(function (miniWork) {// boucle sur les elements des categories
      categories.push(miniWork.category);//recuperer categories avec id et nom pour mettre dans le nom en haut(tab)
      const miniImageUrl = miniWork.imageUrl;
      const miniTitle = miniWork.title;
      const imageId = miniWork.id;

      const figureModale = createElementWithClasses('figure', ['figureBox']);

      const imageModale = document.createElement('img');
      imageModale.src = miniImageUrl;
      imageModale.classList.add('miniImage');
      figureModale.appendChild(imageModale);

      const deleteButton = createElementWithClasses('div', ['trashBox']);
      const deleteIcon = createElementWithClasses('i', ['fa-solid', 'fa-trash-can']);
      deleteButton.appendChild(deleteIcon);
      figureModale.appendChild(deleteButton);

      const textModaleFigure = createElementWithClasses('figcaption', ['textModaleFigure']);
      textModaleFigure.textContent = 'éditer';
      figureModale.appendChild(textModaleFigure);

      miniGallery.appendChild(figureModale);

      // Ajout d'un gestionnaire d'événements pour la suppression d'un élément
      deleteButton.addEventListener('click', function () {
        deleteGalleryElement(imageId, figureModale);
      });
    });

    // Fonction de suppression des éléments de la galerie
    function deleteGalleryElement(imageId, figureModale) {
      const deleteButton = createElementWithClasses('div', ['trashBox']);
      const token = localStorage.getItem('token');
      // Appel à l'API pour delete
      fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json; charset=UTF-8',
          'authorization': `Bearer ${token}`
        },
      })
        .then(() => {
          miniGallery.removeChild(figureModale);
        })
    }
    // Deuxième modale
    const addPhotoModal = createElementWithClasses('div', ['modalContentPhoto']);
    addPhotoModal.style.display = 'none';
    modalOpen.appendChild(addPhotoModal);

    const addPhotoModalCloseCross = createElementWithClasses('p', ['modalPhotoCloseCross']);
    addPhotoModalCloseCross.textContent = 'x';
    addPhotoModalCloseCross.addEventListener('click', closeModal);
    addPhotoModal.appendChild(addPhotoModalCloseCross);

    const arrowBack = createElementWithClasses('i', ['fa-solid', 'fa-arrow-left', 'arrowBack']);
    arrowBack.addEventListener('click', resetModalState);
    addPhotoModal.appendChild(arrowBack);

    const modalPhotoTitle = createElementWithClasses('p', ['modalPhotoTitle']);
    modalPhotoTitle.textContent = 'Ajout Photo';
    addPhotoModal.appendChild(modalPhotoTitle);

    const modalContentPhoto = createElementWithClasses('div', ['modalContentPhoto']);
    addPhotoModal.appendChild(modalContentPhoto);

    const modalPhotoBox = createElementWithClasses('div', ['modalPhotoBox']);
    modalContentPhoto.appendChild(modalPhotoBox);

    const modalphotoBoxEmpty = createElementWithClasses('div', ['modalphotoBoxEmpty']);
    modalPhotoBox.appendChild(modalphotoBoxEmpty);
    // Icône
    const modalphotoBoxEmptyIcon = createElementWithClasses('i', ['fa-sharp', 'fa-regular', 'fa-image']);
    modalphotoBoxEmpty.appendChild(modalphotoBoxEmptyIcon);
    // Texte informatif
    const modalphotoBoxEmptyText = createElementWithClasses('p', ['modalPhotoBoxEmptyText']);
    modalphotoBoxEmptyText.textContent = 'jpeg, png : 4mo max';
    modalphotoBoxEmpty.appendChild(modalphotoBoxEmptyText);

    const modalPhotoBoxEmptyForm = createElementWithClasses('form', ['modalPhotoBoxForm']);
    modalContentPhoto.appendChild(modalPhotoBoxEmptyForm);

    const titleLabel = createElementWithClasses('label', ['modalPhotoBoxLabel']);
    titleLabel.textContent = 'Titre:';
    modalPhotoBoxEmptyForm.appendChild(titleLabel);

    const titleInput = createElementWithClasses('input', ['modalPhotoBoxInput']);
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'title');
    modalPhotoBoxEmptyForm.appendChild(titleInput);

    const categoryLabel = createElementWithClasses('label', ['modalPhotoBoxLabel']);
    categoryLabel.textContent = 'Catégorie:';
    modalPhotoBoxEmptyForm.appendChild(categoryLabel);

    const categorySelect = createElementWithClasses('select', ['modalPhotoBoxSelect']);
    categorySelect.setAttribute('name', 'category');
    modalPhotoBoxEmptyForm.appendChild(categorySelect);

    // Récupérer les catégories distinctes
    //const distinctCategories = [...new Set(categories.map(category => category.name))];

    // le select doit etre vide a l'etat initial et afficher les options apres
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    categorySelect.appendChild(emptyOption);


    fetch('http://localhost:5678/api/categories')
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (categories) {
        // Ajouter les options de catégories
        categories.forEach(function (category) {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      })

    const imageInput = createElementWithClasses('input', ['modalPhotoBoxInput']);
    imageInput.setAttribute('type', 'file');
    imageInput.setAttribute('name', 'image');
    modalPhotoBoxEmptyForm.appendChild(imageInput);

    // Cacher le bouton de parcourir par défaut
    imageInput.style.display = 'none';

    // Afficher l'image miniature sélectionnée
    imageInput.addEventListener('change', function (event) {
      event.preventDefault();
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const imageUrl = event.target.result;

        const backgroundDiv = createElementWithClasses('div', ['backgroundColor']);
        const imageModale = document.createElement('img');
        imageModale.src = imageUrl;
        imageModale.classList.add('miniImagePreview');

        backgroundDiv.appendChild(imageModale);

        // Ajouter la div au modalPhotoBox
        modalPhotoBox.innerHTML = ''; // Supprimer les éléments précédents
        modalPhotoBox.appendChild(backgroundDiv);

        // Masquer le bouton "+ Ajouter photo"
        addButton.style.display = 'none';
      };

      reader.readAsDataURL(file);
    });

    // Créer le bouton "+ Ajouter photo"
    const addButton = createElementWithClasses('button', ['modalPhotoBoxEmptyButton']);
    addButton.textContent = '+ Ajouter photo';
    modalPhotoBoxEmptyForm.appendChild(addButton);

    // Lorsque le bouton "+ Ajouter photo" est cliqué
    addButton.addEventListener('click', function (event) {
      event.preventDefault();
      imageInput.click();
    });

    // Création de l'élément de décoration
    const decoElementModalePhoto = createElementWithClasses('div', ['decoElementModalePhoto']);
    modalContentPhoto.appendChild(decoElementModalePhoto);

    // Création du bouton de soumission
    const submitButton = createElementWithClasses('button', ['validateButton']);
    submitButton.textContent = 'Valider';
    submitButton.type = 'submit';

    // Ajout du bouton au formulaire
    modalPhotoBoxEmptyForm.appendChild(submitButton);

    function sendNewGalleryElement(event) {
      event.preventDefault(); // Empêche le comportement par défaut du bouton de soumission
      const token = localStorage.getItem('token');
      // Préparer les données à envoyer
      const requestData = new FormData()
      requestData.append('title', titleInput.value);
      requestData.append('image', imageInput.files[0]);
      requestData.append('category', parseInt(categorySelect.value));

      // Envoyer la requête POST à l'API pour enregistrer les données
      fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          'accept': 'multipart/form-data',
          'authorization': `Bearer ${token}`,
        },
        body: requestData
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Erreur lors de l\'enregistrement des données');
          }
        })
        .then(function (data) {
          console.log('Données enregistrées avec succès:', data);
          closeModal();
          // Réinitialiser le formulaire après l'enregistrement des données
          modalPhotoBoxEmptyForm.reset();
        })
        .catch(function (error) {
          alert('Merci de remplir tous les Champs');
        });
    }

    submitButton.addEventListener('click', sendNewGalleryElement);

    /******function updateSubmitButton() {
      if (titleInput.value.trim() !== '' && categorySelect.value !== '' && imageInput.files.length > 0) {
        submitButton.disabled = false;
        submitButton.classList.add('valid');
      } else {
        submitButton.disabled = true;
        submitButton.classList.remove('valid');
      }
    }
    
    imageInput.addEventListener('change', function (event) {
    
      updateSubmitButton();
    });
    
    titleInput.addEventListener('input', function () {
      updateSubmitButton();
    });
    
    categorySelect.addEventListener('input', function () {
      updateSubmitButton();
    });******/
  })
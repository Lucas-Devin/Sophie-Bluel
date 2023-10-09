async function getWorks(){
  const result = await fetch('http://localhost:5678/api/works')
  return result.json()
}

function callResetForm(modalPhotoBox){
  const modalphotoBoxEmpty = createElementWithClasses('div', ['modalphotoBoxEmpty']);
  modalPhotoBox.appendChild(modalphotoBoxEmpty);
  // Icon
  const modalphotoBoxEmptyIcon = createElementWithClasses('i', ['fa-sharp', 'fa-regular', 'fa-image']);
  modalphotoBoxEmpty.appendChild(modalphotoBoxEmptyIcon);
  // Info text for the picture 
  const modalphotoBoxEmptyText = createElementWithClasses('p', ['modalPhotoBoxEmptyText']);
  modalphotoBoxEmptyText.textContent = 'jpeg, png : 4mo max';
  modalphotoBoxEmpty.appendChild(modalphotoBoxEmptyText);
}
 // function of delete elements of gallery
 function deleteGalleryElement(imageId, figureModale,miniGallery) {
  const deleteButton = createElementWithClasses('div', ['trashBox']);
  const token = localStorage.getItem('token');
  // call to API for delete
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
      init();
    })
}


function displayMiniGallery(works){
  const miniGallery = document.getElementsByClassName('miniGallery')[0];
  miniGallery.innerHTML="";//empty to replace elements 
  works.forEach(function (miniWork) {// on elements of categories
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

    // event for delete element 
    deleteButton.addEventListener('click', function () {
      deleteGalleryElement(imageId, figureModale,miniGallery);
    });
  });
}

function createElementWithClasses(tagName, classes) {
  const element = document.createElement(tagName);
  element.classList.add(...classes);
  return element;
  //don't have to write classList.add to each element 
}
// close modale
function closeModal() {
  const modalOpen = document.getElementById('modal');
  modalOpen.style.display = 'none';
  resetModalState();
  window.removeEventListener('click', closeModal);
}
//open second modale
function openSecondModal() {
  const modalContent = document.querySelector('.modalContent');
  const addPhotoModal = document.querySelector('.modalContentPhoto');
  const modalPhotoBoxEmptyForm = document.querySelector('.modalPhotoBoxForm');

  modalContent.style.display = 'none';
  addPhotoModal.style.display = 'block';
}
// for reset modale state
function resetModalState() {
  const modalContent = document.querySelector('.modalContent');
  const addPhotoModal = document.querySelector('.modalContentPhoto');
  const modalPhotoBoxEmptyForm = document.querySelector('.modalPhotoBoxForm');
  modalContent.style.display = 'block';
  addPhotoModal.style.display = 'none';
  modalPhotoBoxEmptyForm.reset();
}

// call to the API
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

    works.forEach(function (miniWork) {// on elements of categories
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

      // adding event listener for delete element
      deleteButton.addEventListener('click', function () {
        deleteGalleryElement(imageId, figureModale,miniGallery);
      });
    });
    // Seconde modale
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

    callResetForm(modalPhotoBox);

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

    // for each categories
    // select should be empty and show elements on click only
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    categorySelect.appendChild(emptyOption);


    fetch('http://localhost:5678/api/categories')// used for create select button
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (categories) {
        // Adding options of catégories
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

    // Show picture selected resized
    imageInput.addEventListener('change', function (event) {
      event.preventDefault();
      const file = event.target.files[0];//for the first files selected[0]
      const reader = new FileReader();//to read file selected by user

      reader.onload = function (event) {//file download 
        const imageUrl = event.target.result;

        const backgroundDiv = createElementWithClasses('div', ['backgroundColor']);
        const imageModale = document.createElement('img');
        imageModale.src = imageUrl;// insert image 
        imageModale.classList.add('miniImagePreview');

        backgroundDiv.appendChild(imageModale);

        // adding div to modalPhotoBox
        modalPhotoBox.innerHTML = ''; // delete elements 
        modalPhotoBox.appendChild(backgroundDiv);

        // hidding button "+ Ajouter photo"
        addButton.style.display = 'none';
      };

      reader.readAsDataURL(file);//transform url of image (base64) to <img>
    });

    // Create button "+ Ajouter photo"
    const addButton = createElementWithClasses('button', ['modalPhotoBoxEmptyButton']);
    addButton.textContent = '+ Ajouter photo';
    modalPhotoBoxEmptyForm.appendChild(addButton);

    // button "+ Ajouter photo" is clicked
    addButton.addEventListener('click', function (event) {
      event.preventDefault();
      imageInput.click();
    });

    // element for decorate modale
    const decoElementModalePhoto = createElementWithClasses('div', ['decoElementModalePhoto']);
    modalContentPhoto.appendChild(decoElementModalePhoto);

    // submit button 
    const submitButton = createElementWithClasses('button', ['validateButton']);
    submitButton.textContent = 'Valider';
    submitButton.type = 'submit';

    // adding button to the form
    modalPhotoBoxEmptyForm.appendChild(submitButton);

    function sendNewGalleryElement(event) {
      event.preventDefault(); // to avoid submit button default 
      const token = localStorage.getItem('token');
      // Préparer les données à envoyer
      const requestData = new FormData()
      requestData.append('title', titleInput.value);
      requestData.append('image', imageInput.files[0]);
      requestData.append('category', parseInt(categorySelect.value));

      // send POST request to the API 
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
          closeModal();
          modalPhotoBox.innerHTML='';
          // form to zero after sending 
          callResetForm(modalPhotoBox);
          addButton.style.display = 'block';
          init();

        })
        .catch(function (error) {
          alert('Merci de remplir tous les Champs');
        });
    }

    submitButton.addEventListener('click', sendNewGalleryElement);
  })
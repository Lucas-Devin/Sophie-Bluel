const modale = document.getElementById('modale');
const login = function (mail, password) {

  // Appel à l'API avec fetch
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'accept':'application/json',
      'content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      email: mail,
      password: password
    })
  })
    .then(function (response) {
      console.log(response)
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Identifiants incorrects');
      }
    })
    .then(function (identification) {
      console.log(identification);
      window.location = "index.html";
      localStorage.clear();
      localStorage.setItem('token', identification.token);
      localStorage.setItem('userId', identification.userId);
    })
    .catch(function (error) {
      alert(error.message);
    });
}
const formulaire = document.getElementById("formulaire");
const Button = document.getElementById("sendButton");

formulaire.addEventListener('submit', function (event) {
  event.preventDefault();
  const mail = formulaire.elements['email'].value;
  const password = formulaire.elements['password'].value;

  if (mail && password) {
    login(mail, password);
  } else {
    alert('Identification incorrecte');
  }
});


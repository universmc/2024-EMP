// Récupérez le formulaire et le champ de message
const form = document.getElementById('groq-form');
const messageInput = document.getElementById('message');

// Ajoutez un événement de soumission pour le formulaire
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Empêchez la soumission standard du formulaire
const message = messageInput.value;

  // Créez une requête AJAX pour appeler le serveur Node.js
const req = new XMLHttpRequest();
  req.open('POST', '/groq', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({ message }));

  req.onload = () => {
    const status = req.status;
    if (status === 200) {
      // Mettez à jour le contenu de l'élément HTML avec la réponse
const resultatDiv = document.getElementById('resultat');
      const response = JSON.parse(req.responseText);
      resultatDiv.innerText = response.choices[0].message.content;
    } else if (status === 500) {
      console.error('Une erreur est survenue');
    }
  };
});

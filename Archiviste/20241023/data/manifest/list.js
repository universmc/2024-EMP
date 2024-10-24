const fs = require("fs");

// Simuler des données de manifestations récupérées en temps réel
const manifestData = [
// https://contact.cgt.fr/carte/
];

// Générer le fichier HTML avec CSS et JavaScript intégré
function generateHTML(manifestData) {
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Suivi des Manifestations - 1er Octobre 2024</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        color: #333;
        margin: 0;
        padding: 20px;
      }
      h1 {
        text-align: center;
        color: #e74c3c;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      table, th, td {
        border: 1px solid #ddd;
      }
      th, td {
        padding: 12px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <h1>Suivi des Manifestations du 1er Octobre 2024</h1>
    <table>
      <tr>
        <th>Ville</th>
        <th>Nombre de Manifestants</th>
      </tr>
      ${manifestData.map(item => `
      <tr>
        <td>${item.ville}</td>
        <td>${item.nombre}</td>
      </tr>`).join('')}
    </table>
    <script>
      // Exemple de script pour mettre à jour les données en temps réel
      function updateData() {
        console.log("Mise à jour des données...");
        // Logique pour mettre à jour les données si besoin
      }

      setInterval(updateData, 60000); // Mettre à jour les données toutes les minutes
    </script>
  </body>
  </html>`;

  // Écrire le contenu HTML dans un fichier
  fs.writeFileSync("manifestations_suivi.html", htmlContent);
  console.log("Le fichier HTML a été généré avec succès !");
}

// Appeler la fonction pour générer le fichier HTML
generateHTML(manifestData);


  document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "backend_City_Game_&_Pixel_Art.php";
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log("Données récupérées depuis le backend :", data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  });
  
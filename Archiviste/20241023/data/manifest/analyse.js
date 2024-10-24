const fs = require('fs');
const { JSDOM } = require('jsdom');

// Fonction pour charger et extraire les départements du fichier SVG
async function extractDepartmentsFromSVG(filePath) {
    try {
        const svgData = fs.readFileSync(filePath, 'utf-8');
        const dom = new JSDOM(svgData);
        const document = dom.window.document;

        // Sélectionner tous les éléments <path> qui contiennent les informations de département
        const paths = document.querySelectorAll('path[data-nom][data-numerodepartement]');

        // Créer un tableau pour stocker les départements
        const departments = [];

        paths.forEach((path) => {
            const departmentName = path.getAttribute('data-nom');
            const departmentNumber = path.getAttribute('data-numerodepartement');

            // Ajouter l'objet département à la liste
            departments.push({
                number: departmentNumber,
                name: departmentName
            });
        });

        // Afficher la liste des départements
        console.log('Liste des départements extraits :', departments);
    } catch (error) {
        console.error('Erreur lors de l\'extraction des données du fichier SVG:', error);
    }
}

// Appel de la fonction pour extraire les départements du fichier SVG
(async () => {
    await extractDepartmentsFromSVG('map.svg');
})();

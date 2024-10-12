const fs = require('fs');
const { JSDOM } = require('jsdom');

// Fonction pour charger et analyser le fichier SVG
async function extractDepartments(filePath) {
    try {
        const svgData = fs.readFileSync(filePath, 'utf-8');
        const dom = new JSDOM(svgData);
        const document = dom.window.document;

        // Tableau pour stocker les départements et leurs informations
        const departments = [];

        // Sélectionner tous les groupes <g> qui représentent les départements
        const departmentGroups = document.querySelectorAll('g[class*="region"]');
        
        // Parcourir chaque groupe <g> pour extraire les informations sur les départements
        departmentGroups.forEach((group) => {
            const regionName = group.getAttribute('data-nom');
            const paths = group.querySelectorAll('path');  // Trouver les chemins associés
            
            paths.forEach((path) => {
                const departmentName = path.getAttribute('data-nom');
                const departmentNumber = path.getAttribute('data-numerodepartement');
                
                // Ajouter le département et son numéro au tableau
                departments.push({
                    region: regionName,
                    department: departmentName,
                    number: departmentNumber,
                });
            });
        });

        // Afficher les départements extraits
        console.log('Départements extraits :', departments);

        // Retourner les départements
        return departments;
    } catch (error) {
        console.error('Erreur lors du chargement du fichier SVG:', error);
    }
}

// Appel de la fonction
(async () => {
    const departments = await extractDepartments('map.svg');
    console.log(departments);
})();

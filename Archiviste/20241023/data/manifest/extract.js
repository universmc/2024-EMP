const fs = require('fs');
const { JSDOM } = require('jsdom');

// Fonction pour charger le fichier SVG
async function loadSVG(filePath) {
    try {
        const svgData = fs.readFileSync(filePath, 'utf-8');
        const dom = new JSDOM(svgData);
        const document = dom.window.document;

        // Extraction des départements et villes
        const elements = document.querySelectorAll('g[id^="department-"]');
        const departments = [];

        elements.forEach((element) => {
            const departmentName = element.getAttribute('id').replace('department-', '').trim();

            const cities = [...element.querySelectorAll('text')].map(city => city.textContent.trim());

            departments.push({
                department: departmentName,
                cities: cities
            });
        });

        return departments;
    } catch (error) {
        console.error('Erreur lors du chargement du fichier SVG:', error);
    }
}

// Appel de la fonction
(async () => {
    const departments = await loadSVG('map.svg');
    console.log('Liste des départements et villes :', departments);
})();

const fs = require('fs');
const { JSDOM } = require('jsdom');

// Fonction pour charger et analyser le fichier SVG
async function loadSVG(filePath) {
  return fs.promises.readFile(filePath, 'utf8');
}

// Fonction pour inspecter et extraire les noms de départements et de villes
function inspectSVG(svgContent) {
  const dom = new JSDOM(svgContent);
  const document = dom.window.document;

  // Trouver tous les groupes <g> qui contiennent les départements
  const groups = document.querySelectorAll('g[data-nom]');
  console.log(`Nombre de départements trouvés : ${groups.length}`);

  // Parcourir chaque groupe <g> (chaque département)
  groups.forEach(group => {
    const departmentName = group.getAttribute('data-nom');
    const departmentCode = group.getAttribute('data-code_insee');

    console.log(`🗺️ - Département : ${departmentName} (Code INSEE: ${departmentCode})`);

    // Trouver toutes les villes dans ce département en cherchant les chemins <path> avec un data-nom
    const paths = group.querySelectorAll('path[data-nom]');
    paths.forEach(path => {
      const cityName = path.getAttribute('data-nom');
      const cityCode = path.getAttribute('data-numerodepartement');
      console.log(`- 🗳️  : ${cityName} (Code Département: ${cityCode})`);
    });
  });
}

// Charger le fichier SVG et analyser son contenu
async function main() {
  try {
    const svgContent = await loadSVG('./map.svg');
    inspectSVG(svgContent);
  } catch (err) {
    console.error('Erreur lors du chargement du fichier SVG:', err);
  }
}

main();

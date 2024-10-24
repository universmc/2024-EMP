const puppeteer = require('puppeteer');

// Fonction d'attente personnalisée
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time);
    });
}

async function scrapeCGTMap() {
    // Lance le navigateur
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Accède à la page de la carte CGT
    await page.goto('https://contact.cgt.fr/carte/', { waitUntil: 'networkidle2' });

    // Attendre quelques secondes pour laisser la carte se charger
    await delay(10000); // Pause de 10 secondes

    // Attendre que les marqueurs de la carte se chargent
    try {
        await page.waitForSelector('.leaflet-marker-icon', { timeout: 60000 }); // Attendre 60 secondes si nécessaire
    } catch (error) {
        console.error('Erreur: Les marqueurs de la carte n\'ont pas pu être chargés.', error);
        await browser.close();
        return;
    }

    // Scraper les informations des marqueurs de la carte
    const manifestLocations = await page.evaluate(() => {
        const locations = [];
        
        // Sélectionne chaque marqueur sur la carte et récupère les informations associées
        document.querySelectorAll('.leaflet-marker-icon').forEach(marker => {
            const popupText = marker.getAttribute('alt') || ''; // Utilise l'attribut alt ou récupère d'autres infos
            const coordinates = marker.getAttribute('style'); // Optionnel : récupérer les coordonnées
            locations.push({ popupText, coordinates });
        });
        
        return locations;
    });

    console.log(manifestLocations);

    // Ferme le navigateur
    await browser.close();

    // Retourne les lieux de manifestation
    return manifestLocations;
}

scrapeCGTMap().then(manifestLocations => {
    console.log('Liste des lieux de rassemblement :');
    console.log(manifestLocations);
}).catch(error => {
    console.error('Erreur lors du scraping :', error);
});

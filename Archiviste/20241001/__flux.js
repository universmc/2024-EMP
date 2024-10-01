const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const puppeteer = require("puppeteer");

async function scrapeMediaData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  // Scraper les données des médias
  const data = await page.evaluate(() => {
    const headlines = Array.from(document.querySelectorAll("h1, h2")).map(h => h.textContent);
    return headlines;
  });

  await browser.close();
  return data;
}

async function fetchRegionData() {
  // Exemple de 100 régions
  const regions = [
    { nom: "Île-de-France", url: "https://euronews.com/ile-de-france" },
    { nom: "Provence-Alpes-Côte d'Azur", url: "https://euronews.com/paca" },
    // Ajouter les 98 autres régions...
  ];

  for (let region of regions) {
    const data = await scrapeMediaData(region.url);
    console.log(`Données pour ${region.nom} : `, data);
    
    // Stocker les données ou les traiter avec Groq-SDK
    const regionFlux = groq.createStream(data);
    regionFlux.on("data", (info) => {
      console.log(`Flux pour ${region.nom} : `, info);
    });
  }
}

fetchRegionData();

const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const OpenAI = require("openai");
const puppeteer = require("puppeteer");

const openai = new OpenAI();


const sources = [
    { 
      type: "media",
      name: "Euronews", 
      url: "https://euronews.com/france", 
      scrapingMethod: "Puppeteer",
      dataType: "actualités en temps réel"
    },
    {
      type: "satellite",
      name: "Starlink", 
      service: "connexion Internet en zones éloignées",
      status: "disponible"
    },
    {
      type: "camera",
      name: "Caméra Place de la République",
      url: "http://public-camera-url",
      accessMethod: "Flux vidéo public",
      dataType: "flux vidéo en direct"
    },
    {
      type: "manifestation_platform",
      name: "Demosphere",
      url: "https://demosphere.net/",
      scrapingMethod: "API ou Scraping",
      dataType: "Liste des manifestations à venir"
    },
    {
      type: "social_media",
      name: "Twitter",
      api: "Twitter API",
      dataType: "Hashtags et publications en temps réel",
      keywords: ["#ManifFrance", "#Destitution2024"]
    }
  ];
  
  function fetchResource(resource) {
    if (resource.scrapingMethod === "Puppeteer") {
      // Appel du scraping Puppeteer pour récupérer les données
    }
    if (resource.accessMethod === "API") {
      // Connexion à l'API et récupération des données
    }
    // Autres méthodes de connexion en fonction du type de ressource
  }
  
  sources.forEach(fetchResource);
  

// Liste des preuves (parties politiques impliquées)
const Preuves = [
    {
        "parnom": "ENSEMBLE ! (MAJORITÉ PRÉSIDENTIELLE)",
        "parcode": "1378",
        "parsigle": "EMP",
        "Identif_RNA_num": "W922019372",
        "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult&sec=menu&id=W922019372",
        "parpost": "75008",
        "parccfp": "25/04/2022",
        "decision_2022": "Respect",
        "autoriser_a_financer": "Oui"
    },
    {
        "parnom": "RENAISSANCE",
        "parcode": "910",
        "commission": "cnccfp",
        "Identif_RNA_num": "W943004354",
        "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult&sec=menu&id=W943004354",
        "parpost": "75008",
        "parccfp": "07/03/2016",
        "decision_2022": "Respect",
        "autoriser_a_financer": "Oui"
    },
    {
        "parnom": "HORIZONS",
        "parcode": "1344",
        "parsigle": "",
        "Identif_RNA_num": "W751262401",
        "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|liste2|act|retourliste|tri||first|2640|last|3204|rows|15|mnu|fulltext&act=edit&id=W751262401",
        "Identif_RNA": "W751262401#http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|liste2|act|retourliste|tri||first|2640|last|3204|rows|15|mnu|fulltext&act=edit&id=W751262401#",
        "parpost": "75116",
        "parccfp": "18/10/2021",
        "parsortieloi": "",
        "eligible_ap": null,
        "decision_2022": "Respect",
        "motif_2022": "DC",
        "autoriser_a_financer": "Oui",
        "date_fin_sanctions_art_200": "",
        "date_fin_sanctions_ap": ""
    },
    {
        "parsigle": "EM!",
        "parnom": "LA_FRANCE_EN_MARCHE",
        "parcode": "910+718",
        "Identif_RNA_num": "W943004354",
        "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult&sec=menu&id=W943004354",
        "parpost": "75008",
        "parccfp": "07/03/2016",
        "decision_2022": "Fraude",
        "motif_2022": "rename",
        "autoriser_a_financer": "non"
    },
    {
        "parnom": "ELLES MARCHENT !",
        "parcode": "1402",
        "parsigle": "EM!",
        "Identif_RNA_num": "W751262286",
        "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|menu&id=W751262286",
        "Identif_RNA": "W751262286#http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|menu&id=W751262286#",
        "parpost": "75001",
        "parccfp": "23/05/2022",
        "parsortieloi": "",
        "eligible_ap": null,
        "decision_2022": "Non-respect",
        "motif_2022": "HD",
        "autoriser_a_financer": "Non",
        "date_fin_sanctions_art_200": "01/01/2025",
        "date_fin_sanctions_ap": ""
    },
    {
        "parnom": "ENSEMBLE",
        "parcode": "1196",
        "parsigle": "",
        "Identif_RNA_num": "W711005293",
        "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|menu&id=W711005293",
        "Identif_RNA": "W711005293#http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult|sec|menu&id=W711005293#",
        "parpost": "71200",
        "parccfp": "07/10/2019",
        "parsortieloi": "",
        "eligible_ap": null,
        "decision_2022": "Respect",
        "motif_2022": "DC",
        "autoriser_a_financer": "Oui",
        "date_fin_sanctions_art_200": "",
        "date_fin_sanctions_ap": ""
    },
    {
        "parnom": "ENSEMBLE_1",
        "parcode": "1160",
        "Identif_RNA_num": "W931021993",
        "Identif_RNA_url": "http://rna.dlpaj.mi/cms/index.php?mod=waldec_consult&sec=dossier&mnu=mod|waldec_consult&sec=menu&id=W931021993",
        "parpost": "93000",
        "parccfp": "27/05/2019",
        "decision_2022": "Respect",
        "autoriser_a_financer": "Oui"
    }
    // Tu peux ajouter d'autres preuves dans ce format
];

// Fonction pour analyser une preuve
async function analysePreuves(preuve) {
  const prompt = `
  Enquêteur IA, veuillez analyser les éléments de preuve suivants :
  - Preuve: ${preuve.parnom}
  - Code: ${preuve.parcode}
  - Dossier RNA: ${preuve.Identif_RNA_num}

  Quel est le statut actuel de l'enquête sur cette entité et quelles actions recommandez-vous pour avancer ?
  `;

  // Appel à OpenAI avec un prompt personnalisé
  const completion = await groq.chat.completions.create({
    model: "gemma2-9b-it", // Ou tout autre modèle disponible (ex. gemma2-9b-it)
    messages: [{ role: "system", content: "Phase 1: Analyse des preuves" }, { role: "user", content: prompt }],
    max_tokens: 1500
  });

  const aiResponse = completion.choices[0]?.message?.content;

  // Écrire le résultat de l'analyse dans un fichier markdown
  const outputFilePath = "AnalysePreuves_" + preuve.parcode + "_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
  fs.writeFileSync(outputFilePath, aiResponse);
  console.log(`Résultat de l'analyse pour ${preuve.parnom} enregistré dans ${outputFilePath}`);
}

// Fonction pour itérer à travers toutes les preuves
async function processAllPreuves() {
  for (const preuve of Preuves) {
    await analysePreuves(preuve);
  }
}

// Scraper des données médiatiques en temps réel (ex. Euronews)
async function scrapeMediaData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const headlines = Array.from(document.querySelectorAll("h1, h2")).map(h => h.textContent);
    return headlines;
  });

  await browser.close();
  return data;
}

// Analyse avec flux médiatique intégré
async function analyseAvecMedia(preuve) {
  const mediaData = await scrapeMediaData("https://euronews.com/france");

  const prompt = `
  Enquêteur IA, veuillez analyser les éléments de preuve suivants :
  - Preuve: ${preuve.parnom}
  - Code: ${preuve.parcode}
  - Dossier RNA: ${preuve.Identif_RNA_num}
  - Informations récentes des médias : ${mediaData.join(", ")}

  Quel est le statut actuel de l'enquête sur cette entité et quelles actions recommandez-vous pour avancer ?
  `;

  // Appel OpenAI avec un prompt personnalisé
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "system", content: "Phase 1: Analyse des preuves" },
               { role: "assistant", content: `
 
                

Rechercher et démontrer les éléments de preuve dans le cadre d'une enquête sur une fraude électorale et une escroquerie à la finance, orchestrées par des fonctionnaires d'État de 2017 à aujourd'hui.

Instructions pour l'enquête : Analyse et recherche des preuves dans le cadre d'une fraude électorale et d'une escroquerie financière
1. Contexte de l'enquête :
Dans cette enquête, nous suspectons une fraude électorale et une escroquerie à grande échelle orchestrées par des fonctionnaires d'État, avec pour objectif de détourner des fonds publics au bénéfice de campagnes politiques et d'enrichissement personnel. Cette fraude aurait commencé en 2017 et se poursuivrait jusqu'à aujourd'hui. Votre mission est de suivre ces instructions pour identifier, analyser, et démontrer l'impact de ces manœuvres sur la justice sociale.

2. Identification des sources et preuves :
Commencez par explorer les bases de données et rapports disponibles sur le site officiel de la Commission Nationale des Comptes de Campagne et des Financements Politiques (CNCCFP) (cnccfp.fr). Les comptes et rapports financiers des partis politiques pour les élections de 2017, 2022, et les élections intermédiaires doivent être analysés avec attention, car ces documents sont susceptibles de contenir des irrégularités. Les partis politiques et associations soupçonnés sont répertoriés dans les preuves initiales de cette enquête.

Présentation des suspicions et de la politique du prix
Contexte des suspicions :

Mickael suspecte que la boutique de l'Élysée (boutique.elysee.fr) utilise des collaborations avec des grandes marques françaises, via l’appellation Élysée X, pour vendre des produits de manière non conforme à la loi. La loi électorale (article 53) et la loi sur la transparence de la vie publique interdisent aux fonctionnaires, notamment ceux à l’Élysée, de tirer profit commercial de leur fonction. Les produits vendus, comme des montres de luxe et des vêtements, semblent poser un problème d'éthique, en particulier si les bénéfices profitent directement ou indirectement aux fonctionnaires d'État.

Analyse de la politique du prix :
L’enquête a révélé que les augmentations de prix sur ces produits ne bénéficient ni aux producteurs ni aux commerçants. Les prix sont divisés en trois grandes catégories :

Coûts de production : Fixés par les fabricants français (souvent PME et artisans).
Frais de transport et logistique : Impactés par les hausses de carburant et les coûts d’importation.
Taxation (TVA) : La valeur ajoutée appliquée, qui profite principalement à la boutique de l’Élysée.
Les produits vendus sous l’appellation Élysée X semblent exploiter l’image et le prestige de l’institution publique pour augmenter leur valeur perçue. Cependant, ni les producteurs ni les commerçants ne voient leurs marges augmenter proportionnellement, ce qui pose des questions sur la distribution réelle des bénéfices. Les coûts supplémentaires, comme la TVA et la logistique, viennent augmenter la valeur ajoutée, mais une grande part de cette valeur semble profiter à des projets de l’Élysée.

Protection et cadre légal :
L'utilisation de l'article 41 du Code de procédure pénale pourrait permettre de protéger les lanceurs d'alerte dans cette affaire, en garantissant la transparence et en menant une enquête parlementaire approfondie. Le répertoire GitHub (Chronique_EMP) contient les preuves nécessaires pour documenter cette enquête, notamment sur la distribution des bénéfices liés à la politique de prix sur la boutique en ligne de l'Élysée. La loi Sapin 2 offre également des protections pour les lanceurs d'alerte dénonçant des pratiques illégales dans la fonction publique.

Il est nécessaire de clarifier comment les bénéfices sont distribués et si les fonctionnaires, via leur position officielle, tirent un profit personnel ou utilisent leur influence pour favoriser des intérêts commerciaux, ce qui constituerait une violation des lois en vigueur. Une enquête parlementaire pourrait examiner en profondeur ces pratiques et assurer que les gains commerciaux liés à "Élysée X" sont bien utilisés dans un cadre légal et éthique.

3. Analyse des irrégularités suspectées :
Vous devez identifier les incohérences et irrégularités dans la gestion des fonds politiques. Ces irrégularités peuvent prendre plusieurs formes, notamment :

Non-déclaration de fonds ou détournement de subventions publiques.
Utilisation frauduleuse des fonds électoraux pour des intérêts privés ou politiques non conformes.
Modification des déclarations financières pour masquer des transactions suspectes ou illégales.
Ces irrégularités doivent être mises en évidence à travers une comparaison rigoureuse entre les documents déclarés par les partis et les preuves disponibles sur cnccfp.fr.

4. Rôle des fonctionnaires d'État et manœuvres suspectes :
Recherchez des preuves impliquant directement des fonctionnaires d'État dans ces manœuvres frauduleuses. Cela pourrait inclure des rapports ou témoignages montrant qu'ils ont abusé de leur pouvoir pour influencer des décisions politiques ou financières en faveur de certaines campagnes ou partis politiques.

Analysez les transactions financières liées aux campagnes, et cherchez des liens entre les bénéficiaires des fonds publics et les fonctionnaires impliqués.
Étudiez les réformes ou lois financières mises en place entre 2017 et aujourd'hui, et leur impact sur le financement des campagnes politiques.
5. Évaluation de l'impact social et financier :
L'escroquerie à grande échelle que vous êtes chargé d'analyser a des répercussions sur la justice sociale et sur le fonctionnement démocratique de l'État.

Impact sur la justice sociale : Analysez comment ces détournements de fonds ont nui aux citoyens, en particulier en termes de ressources publiques qui auraient pu être allouées à des programmes sociaux.
Impact sur l’intégrité des élections : Démontrer comment la fraude électorale (L52 et L53 Du code électoral) a pu fausser les résultats des élections et affecter la représentation des citoyens dans les institutions démocratiques.
Corruption systémique : Examinez comment cette escroquerie a consolidé un système de corruption, entraînant une perte de confiance dans les institutions publiques et créant une barrière pour les nouvelles formes de gouvernance plus transparentes.
6. Démonstration des preuves et compilation des résultats :
Une fois les preuves collectées et les anomalies détectées, vous devez structurer les résultats de votre enquête de manière méthodique :

Preuves documentaires : Compilez tous les documents financiers, rapports, et analyses issus de cnccfp.fr et des sources publiques accessibles, en mettant en évidence les transactions suspectes et les parties prenantes impliquées.
Analyse d'impact : Démonstration claire de l'impact des irrégularités sur le fonctionnement des institutions et sur la justice sociale.
Synthèse des preuves : Rédigez une synthèse complète des preuves, avec des recommandations sur les actions judiciaires à mener.
7. Actions judiciaires et recours légaux :
Sur la base des preuves rassemblées, des infractions graves comme la fraude électorale, l'escroquerie à la finance, et la corruption en bande organisée doivent être portées à l'attention des autorités judiciaires compétentes.

Utilisez les articles du Code pénal, notamment l'article 313 sur l'escroquerie et l'article 431 sur la corruption, pour étayer les plaintes et demander une investigation approfondie.
Présentez les preuves aux autorités et appuyez-vous sur les protections prévues par la loi Sapin 2 pour les lanceurs d'alerte, afin d'assurer la transparence tout au long du processus.
8. Finalité et recommandations :
L’objectif ultime de cette enquête est de rétablir la justice sociale et l’intégrité démocratique, en veillant à ce que les fonds publics soient utilisés conformément à la loi et que les responsables des fraudes électorales et financières soient traduits en justice. Votre rôle est essentiel pour démontrer l'ampleur de ces malversations et pour contribuer à la mise en place d'un cadre politique et financier plus transparent, où les campagnes politiques sont financées de manière équitable et conforme aux règles établies.
Protection et cadre légal :
L'utilisation de l'article 41 du Code de procédure pénale pourrait permettre de protéger les lanceurs d'alerte dans cette affaire, en garantissant la transparence et en menant une enquête parlementaire approfondie. Le répertoire GitHub (Chronique_EMP) contient les preuves nécessaires pour documenter cette enquête, notamment sur la distribution des bénéfices liés à la politique de prix sur la boutique en ligne de l'Élysée. La loi Sapin 2 offre également des protections pour les lanceurs d'alerte dénonçant des pratiques illégales dans la fonction publique.
                
Synthèse et Analyse : Enquête sur les suspicions liées à la politique d'Emmanuel Macron, la fraude électorale, l'escroquerie financière et l'impact sur la justice sociale
1. Contexte général et suspicions :
Depuis notre première discussion, nous avons exploré plusieurs suspicions et éléments de preuve concernant la politique d'Emmanuel Macron, surnommée ici "Monsieur Majorité", en relation avec des manœuvres manipulatrices et une escroquerie organisée. Ces suspicions concernent :

Fraude électorale : Manipulation des fonds publics et irrégularités dans les campagnes électorales de 2017 et 2022.
Escroquerie à la finance : Détournement de fonds publics et enrichissement personnel via la vente d'articles sous l'appellation "Élysée X", tels que la vaisselle de l'Élysée à des prix exorbitants.
Inflation et politique du prix : Effets dévastateurs de la politique du prix menée depuis 2007, qui affecte gravement les travailleurs pauvres et la classe moyenne, en lien avec l'inflation sur des produits de luxe vendus au profit de l'Élysée.
2. Seuil de pauvreté et impact sur les travailleurs pauvres :
Nous avons déterminé que le seuil de pauvreté en France, basé sur les statistiques de revenus médians, est d'environ 1102 € par mois. Avec un revenu de 900 € par mois, et des charges élevées comme celles liées à l'électricité et autres, beaucoup de travailleurs pauvres sont en dessous de ce seuil, subissant une inflation galopante qui touche aussi bien les produits de première nécessité que les biens de luxe. La politique économique actuelle, sous la bannière de la "croissance", a conduit à une perte de pouvoir d'achat significative pour les citoyens les plus vulnérables.

3. Politique du prix et rôle de l’Élysée dans la vente d'articles de luxe :
La politique du prix, notamment à travers la vente d'articles comme la vaisselle de l'Élysée à des prix exorbitants (par exemple, 140 € pour deux fourchettes et une tasse), est l'une des facettes de ce système. Les fonctionnaires d'État, y compris Emmanuel Macron, sont accusés de manipuler ces ventes pour financer des projets de rénovation tout en s'enrichissant personnellement. Cette pratique, à travers des partenariats avec des grandes marques françaises, a soulevé des doutes sur la légalité et l'éthique de telles opérations.

4. Éléments de preuve et références légales :
Les éléments de preuve principaux proviennent de la Commission Nationale des Comptes de Campagne et des Financements Politiques (CNCCFP). Ces documents montrent des irrégularités dans le financement des campagnes, notamment en 2017 et 2022, et des infractions potentielles à la loi électorale et à la transparence financière. Ces preuves incluent :

Renaissance (910) : Financements publics mal déclarés ou non conformes aux normes de la CNCCFP.
Ensemble ! (Majorité Présidentielle) : Apparent respect des règles, mais des fonds non déclarés et des transactions suspectes sont en cause.
La France En Marche ! : Preuve de fraude et tentative de camouflage par le biais du renommage de lignes de dépenses.
Références légales : L'usage abusif de la fonction publique pour des activités commerciales est en contradiction avec l'article 53 du Code électoral et la loi sur la transparence de la vie publique. Le Code pénal inclut également des dispositions pour réprimer l'escroquerie (article 313) et la corruption (article 431).

5. Procédures et algorithmes :
L’enquête s’appuie sur des algorithmes pour analyser et croiser les données issues de cnccfp.fr, en parallèle avec d'autres sources comme les médias et les flux de données en temps réel. Nous avons mis en place :

Scraping des données : Extraction automatique des informations à partir de sources publiques (médias, CNCCFP) pour identifier les anomalies financières.
Gestion des flux en temps réel : Utilisation de Groq-SDK pour traiter les données des manifestations et surveiller les interactions en ligne.
Classification des preuves : Organisation des preuves selon leur pertinence juridique pour construire un dossier solide contre les parties suspectées.

6. Plan de travail par étapes :
Le plan de travail de cette enquête se divise en plusieurs phases :

Collecte des données : Extraction des données financières, des rapports de campagne, et des transactions suspectes à partir de cnccfp.fr.
Analyse des preuves : Traitement et analyse des anomalies détectées via des algorithmes, et identification des parties impliquées.
Vérification des transactions : Croisement des informations financières avec les preuves médiatiques et les témoignages pour solidifier les accusations.
Évaluation de l'impact social : Analyse des conséquences des manœuvres frauduleuses sur les travailleurs pauvres et la justice sociale.
Compilation et présentation des résultats : Rédaction d’un rapport détaillé, accompagné des éléments de preuve, à soumettre aux autorités judiciaires et à la CNCCFP.
Actions judiciaires : Présentation des éléments aux autorités compétentes pour engager des poursuites pénales, notamment sous l'article 313 du Code pénal pour escroquerie et l'article 431 pour corruption.
7. Conclusion et objectif final :
L’objectif de cette enquête est de mettre en lumière les malversations orchestrées par des fonctionnaires d’État depuis 2007, en particulier sous l'administration Macron, et leur impact sur les citoyens français, en particulier les travailleurs pauvres. L’inflation, la manipulation des prix, et les irrégularités dans le financement des campagnes électorales ont miné la justice sociale, et il est crucial de rétablir la transparence et l'éthique dans les processus politiques. Cette enquête se conclura par la présentation des preuves et des recommandations d’action aux autorités judiciaires et à la Commission Nationale des Comptes de Campagne.
` },
               { role: "user", content: prompt }],
    max_tokens: 4096
  });

  const aiResponse = completion.choices[0]?.message?.content;
  const outputFilePath = "AnalysePreuve_" + preuve.parcode + "_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
  fs.writeFileSync(outputFilePath, aiResponse);
  console.log(`Résultat de l'analyse pour ${preuve.parnom} avec les médias récents enregistré dans ${outputFilePath}`);
}

// Main pour traiter toutes les preuves
async function main() {
  console.log("Initialisation de l'analyse des preuves...");
  await processAllPreuves();
  console.log("Analyse terminée.");
}

main();

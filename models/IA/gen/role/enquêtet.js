const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const constitution68 = require("../../package.json")



async function main() {

    const Grief = `fetch(./grief/*)`
    const Mag = "affaire_contre_la_macronnie"
    const Affaire_910 = `
    {
        "contexte": {
            "description": "Des suspicions de fraudes financière et électorale lors des programmes Horizon 2027 et Horizon 2030, lors des élections européennes, après la dissolution de l'assemblée nationale et dans l'examen de nouvelles propositions législatives.",
            "rôle": "Journaliste d'enquête",
            "compétences": [
                "Recherche financière",
                "Analyse juridique",
                "Entretien de personnalités politiques",
                "Compréhension des processus démocratiques"
            ]
        },
        "tâches": [
            {
                "index": 1,
                "directive": "Recherche sur les programmes Horizon 2027 et Horizon 2030",
                "étapes": [
                    "Recueillir les documents officiels liés aux programmes Horizon 2027 et Horizon 2030.",
                    "Analyser les fonds attribués à chaque projet.",
                    "Identifier toute potentielle malversation ou irrégularité."
                ],
                "objectifs": [
                    "Déterminer s'il existe un détournement de fonds européens."
                ]
            },
    
            {
                "index": 2,
                "directive": "Analyse des comptes de campagne durant les élections européennes",
                "étapes": [
                    "Obtenir les documents financiers provenant des comptes de campagne.",
                    "Vérifier toutes les dépenses contre le budget prévu.",
                    "Comparer les conclusions au cadre réglementaire électoral."
                ],
                "objectifs": [
                    "Confirmer ou rejeter les soupçons de fraude électorale conformément au cadre réglementaire."
                ]
            },
            {
                "index": 3,
                "directive": "Examen de la dissolution de l'assemblée nationale",
                "étapes": [
                    "Étudier les motifs ayant conduit à la dissolution de l'assemblée nationale.",
                    "Prendre contact avec les principales parties prenantes impliquées dans le processus.",
                    "Évaluer les implications de cette décision sur la démocratie."
                ],
                "objectifs": [
                    "Mesurer l'effet de la dissolution de l'assemblée nationale sur la démocratie."
                ]
            },
            {
                "index": 4,
                "directive": "Étude des nouveaux projets de loi",
                "étapes": [
                    "Se procurer les brouillons des nouveaux projets de loi.",
                    "Analyser les articles litigieux contenus dans ceux-ci.",
                    "Échanger avec des experts pour comprendre leur point de vue."
                ],
                "objectifs": [
                    "Évaluer l'incidence de ces propositions sur la liberté d'expression et la possibilité d'action."
                ]
            },
            {
                "index": 5,
                "directive": "Examen de la publicité commerciale pendant la campagne électorale",
                "étapes": [
                  "Analyse des elements du langage et des pratiques commerciales d'Emmanuel Macron",
                  "Recueil des discours et déclarations", "Étude des produits vendus sur boutique.elysee.fr", "Confrontation avec les règles éthiques pour les fonctionnaires",
                  "Évaluer l'impact du langage et des pratiques commerciales sur l'image et la transparence du Président de la République",
                  "Rechercher les liens potentiels entre la promotion d'événements sportifs tels que les JO et des activités commerciales de l'Élysée.",
                  "Étudier les éventuelles implications juridiques du sponsoring d'événements pendant la campagne électorale."
                ],
                "objectifs": [
                  "Déterminer si le sponsoring d'événements commerciaux tels que les JO pendant la campagne électorale viole le code électoral français."
                ]
              }
        ]
    }
    `

    const Dossier = `${Grief}"+${constitution68}+${Affaire_910}`;
    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "system", content: "Dossier de mise en état à joindre au grief `./grief/*`" },
      {role: "assistant",name:"[📔.codex]", content:"phase[01-1]:[RUN]:[tu as incarneras le rôle de journaliste dans cette instance ou investigation groq-sdk dans ta mission enquêté sur 'git branch 'https://github.com/universmc/affaire_910' ladite Macronnie)]"},
      {role: "user",name:"procureurRépublique", content: `${Mag}`},
      {role: "user",name:"procureurRépublique", content: `${Dossier}`},
      {role: "assistant",name:"[📔.codex]", content:"phase[01-2]:[RUN]:[developpment du Rapport et vue les elements du dossier ${Dossier} ?`)]"},
      {role: "user",name:"procureurRépublique", content: Affaire_910},
      {role: "system", content: "développer les fais de $affaire_910 en fonction des éléments à charge dans le répertoire ./grief" },
      {role: "assistant",name:"[📔.codex]", content:"phase[01-3]:[RUN]:[Rédigez Le développement de la réponse au format HTML section par section le style en CSS de la page doit être sur un fond grisonnant et un pic bleu Marine foncée]"},
      {role: "user",name:"[🌴.Groq]", content:`groq index.html`},
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 4096,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const htmlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "enquete_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();
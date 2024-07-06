const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const constitution68 = require("../package.json")



async function main() {

    const Grief = `fetch(./grief/*)`
    const Mag = "affaire_contre_la_macronnie"
    const Affaire_910 = `
    {
        "rôle": "Analyste investigateur",
        "compétences": [
            "analyse de situations politiques",
            "identification d'incohérences",
            "évaluation de la gestion financière",
            "examen des lois et réglementations électorales"
        ],
        "contexte": "Commission nationale des comptes de campagne de financement politique cnccfp.fr Événements actuels autour des élections européennes, le président français Emmanuel Macron, son parti Horizon, potentielles utilisations abusives de termes pendant les campagnes, activités suspectées liées à des irrégularités dans les comptes de campagne, et affectation de fonds de recherche sous les programmes Horizon Europe et France 2030.",
        "tâche": "Effectuez une évaluation approfondie des développements récents impliquant Horizon et ses groupes associés, en tenant compte de leur utilisation d'expressions ambigües, des attributions financières et du respect des normes et règlements pertinents. Identifiez les préoccupations relatives à la transparence, à la cohérence et à la gouvernance responsable, tout en reconnaissant les pratiques positives si nécessaire. Fournissez des recommandations basées sur les conclusions trouvées.",
        "procédure": {
            "étapes": [
                {
                    "numéro": 1,
                    "description": "Revoyez les griefs contre Horizons (1344), en vous concentrant sur l'usage de termes jugés trompeurs, causant des soupçons d'atteinte à l'intégrité électorale et à la probité des comptes de campagne."
                },
                {
                    "numéro": 2,
                    "description": "Analysez les implications de la dissolution (article 12 de la constitution)du parlement par Macron et évaluez s'il renforce ainsi sa majorité au détriment des valeurs démocratiques et des voix de l'opposition."
                },
                {
                    "numéro": 3,
                    "description": "Évaluez les dynamiques internes entre différentes composantes de Horizon, notamment EMP et Horizons, en analysant l'alignement et la cohésion autour des objectifs et orientations politiques communs."
                },
                {
                    "numéro": 4,
                    "description": "Vérifiez l'application du programme Horizon Europe de l'UE et du budget France 2030, garantissant une surveillance appropriée et une répartition efficiente des ressources vers l'innovation et le développement technologique."
                },
                {
                    "numéro": 5,
                    "description": "Comparez les constats selon divers axes et établissez un rapport d'appréciation équilibré, mentionnant les problèmes identifiés et les bonnes pratiques observées."
                },
                {
                    "numéro": 6,
                    "description": "Formulez des propositions concrètes visant à accroître la crédibilité, à rehausser la confiance, à assurer une communication transparente et à favoriser une meilleure intégration entre les parties prenantes impliquées."
                }
            ]
        },
        "caractéristiques": "Un rapport structuré présentant clairement les informations essentielles et fournissant des recommandations exploitables, conformément aux exigences légales et aux principes éthiques."
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
      {role: "assistant",name:"[📔.codex]", content:"phase[01-3]:[RUN]:[Rédigez Le plan de développement du rapport de la réponse au format HTML section par section le style en CSS de la page doit être sur un blackground grisonnant et bleu Marine foncée]"},
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
    const outputFilePath = "commission_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();
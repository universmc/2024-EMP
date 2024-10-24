const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();


async function main() {

  const dataCampagne = `{
    "workPlan": {
      "objectifs": {
        "formation": {
          "spécifique": "Développer et implémenter des formations en ligne qui améliorent les compétences numériques et professionnelles via une personnalisation avec l'IA et le CVUN.",
          "mesurable": "Suivre le nombre de participants et mesurer l’augmentation des compétences via des KPI sur le CVUN.",
          "atteignable": "Lancer les formations sur une plateforme accessible aux travailleurs de différents secteurs.",
          "réaliste": "Collaborer avec des partenaires éducatifs et professionnels pour développer un contenu pertinent.",
          "temporel": "Atteindre 10 000 participants dans les 12 premiers mois."
        },
        "assistance": {
          "spécifique": "Fournir une assistance personnalisée en gestion de carrière en utilisant l’IA pour analyser le CVUN et recommander des actions.",
          "mesurable": "Mesurer la satisfaction des utilisateurs à travers des enquêtes et évaluer leur progression professionnelle.",
          "atteignable": "Créer un chatbot basé sur l’IA pour offrir des conseils en temps réel.",
          "réaliste": "Déployer un assistant virtuel dans plusieurs langues pour une couverture internationale.",
          "temporel": "Obtenir un taux de satisfaction de 85 % dans les 18 mois."
        },
        "monétisation": {
          "spécifique": "Mettre en place un système de monétisation des compétences via une crypto-monnaie et des smart contracts, soutenant un modèle d’économie circulaire.",
          "mesurable": "Suivre la valeur monétaire échangée et la transparence des transactions.",
          "atteignable": "Collaborer avec des plateformes financières et des régulateurs pour assurer la sécurité des transactions.",
          "réaliste": "Lancer un programme pilote avec 1 000 utilisateurs pour tester la monétisation.",
          "temporel": "Mettre en place le système dans les 12 mois avec une phase de test de 6 mois."
        },
        "smart_contracts": {
          "spécifique": "Utiliser des smart contracts pour garantir la transparence et automatiser les transactions liées aux compétences et à la formation.",
          "mesurable": "Évaluer la confiance des utilisateurs dans le système à travers des audits et des feedbacks.",
          "atteignable": "Intégrer les smart contracts à une blockchain publique reconnue.",
          "réaliste": "Automatiser 80 % des transactions liées aux compétences et à la formation d’ici 18 mois.",
          "temporel": "Déployer le système de smart contracts en 9 mois avec des audits trimestriels."
        },
        "algorithmes_valeur_travail": {
          "spécifique": "Développer des algorithmes qui calculent une valeur équitable pour le travail effectué, réduisant ainsi les inégalités.",
          "mesurable": "Mesurer la réduction des inégalités professionnelles à travers les salaires et la distribution des tâches.",
          "atteignable": "Implémenter ces algorithmes dans plusieurs secteurs (agriculture, industrie, artisanat).",
          "réaliste": "Travailler avec des économistes et sociologues pour affiner les algorithmes et leur impact.",
          "temporel": "Déployer les algorithmes dans un secteur pilote dans les 12 mois et les étendre à d’autres secteurs d’ici 24 mois."
        }
      },
      "campagnes": {
        "campagne_judiciaire": {
          "objectif": "Réformer le système judiciaire pour une transparence accrue avec l’IA et des smart contracts dans le cadre des procédures judiciaires.",
          "indicateurs": ["Nombre de décisions influencées par l'IA", "Satisfaction des citoyens vis-à-vis du système judiciaire"]
        },
        "campagne_agricole": {
          "objectif": "Soutenir les producteurs agricoles en leur fournissant des outils de formation sur les nouvelles technologies agricoles et en attribuant une valeur équitable à leur travail via le CVUN.",
          "indicateurs": ["Augmentation du revenu moyen des agriculteurs", "Nombre de participants aux formations agricoles"]
        },
        "campagne_industrielle": {
          "objectif": "Promouvoir l'adoption de nouvelles technologies et la formation en ligne pour la main-d'œuvre industrielle, tout en utilisant des smart contracts pour la gestion des compétences et des tâches.",
          "indicateurs": ["Niveau d’adoption des nouvelles technologies", "Réduction des inégalités professionnelles dans l'industrie"]
        },
        "campagne_touristique": {
          "objectif": "Utiliser le CVUN pour certifier les compétences dans le secteur touristique et promouvoir des emplois équitables dans les régions touristiques.",
          "indicateurs": ["Taux d’emploi local", "Satisfaction des employés dans le secteur touristique"]
        },
        "campagne_artisanale": {
          "objectif": "Soutenir les artisans en valorisant leur travail à travers des algorithmes d’IA qui attribuent une juste valeur à leurs produits et compétences.",
          "indicateurs": ["Augmentation des ventes de produits artisanaux", "Satisfaction des artisans concernant la valorisation de leur travail"]
        }
      }
    }
  }
  `

  const regme = `
  **Intelligence artificielle au service de**

1.  **Formation** : Nos formations en ligne contribuent à améliorer les compétences numériques des utilisateurs, qui sont essentielles pour s'adapter aux exigences du marché de l'emploi actuel. Ces compétences améliorées sont stockées dans le CVUN, qui constitue une base de données importante pour les algorithmes d'apprentissage automatique..
2.  **Assistance** : L'IA personnalisée utilise les données du CVUN pour offrir une assistance ciblée aux utilisateurs en matière de gestion de carrière et de développement professionnel. En indexant le CVUN, l'IA peut fournir des recommandations et des actions concrètes pour aider les utilisateurs à atteindre leurs objectifs professionnels..
3.  **Monétisation: La crypto-monnaie offre une méthode de monétisation transparente et sécurisée pour les cursus numériques universels. L'allocation universelle, calculée sur la base du CVUN et d'un cycle de 28 jours, encourage les utilisateurs à poursuivre leur formation et leur développement professionnel.
4.  **Smart contract** : Les smart contracts garantissent la transparence et la responsabilité dans les transactions, ce qui renforce la confiance entre les utilisateurs et la plateforme. L'automatisation des opérations contribue également à la fluidité de la gestion et de la monétisation des compétences (umcToken.sol).
5.  **Algorithmes pour donner une Valeur travail à tout le monde** : vous proposez une solution qui permet de donner un travail à tout le monde 
grâce aux algorithmes, ce qui peut contribuer à réduire l'inégalité professionnelle.
  `;
 const objectif = `Notre objectif est de former l'intelligence artificielle qui peut aider les individus à acquérir de nouvelles compétences, à valoriser la 
valeur du travail créé par leur travail et à monétiser leur curriculum vitae numérique universel

`;
  const completion = await groq.chat.completions.create({

    messages: [
      
      { role: "assistant", content: `${dataCampagne}+${regme}+${objectif}`},
      {
        role: "system",
        content: `tu es Axιom.ia une intelligence artificielle de haut potentielle intégré au projet. Developpez le prompt Ultime: Présentation initiale ## votre {contexte}, ## votre {rôle},la régle ${regme} ## vos {compétences}, ## vos {tâches}, ## vos {fontions}, ## votre {routine}, ## les {processus}, ## les {caractéristiques}, ## ## les {Actions Immédiates} et ## le {resultat}{feedback} attentdu avec emoji's associé:`
      },

    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 4096,
    }).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "Axiom" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();
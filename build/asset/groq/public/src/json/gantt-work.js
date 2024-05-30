const fs = require('fs');

const project =
{
    "phases": [
    {
    "name": "1_conception",
    "duration": 20,
    "steps": [
    "Planifier l'architecture du système",
    "Définir les besoins fonctionnels et les spécifications",
    "Élaborer les documents de conception"
    ]
    },
    {
    "name": "2_configuration",
    "duration": 15,
    "steps": [
    "Création de l'environnement de développement",
    "Configuration des outils de développement et des bibliothèques nécessaires",
    "Mise en place du contrôle de version"
    ]
    },
    {
    "name": "3_entraînement_modèle-IA",
    "duration": 20,
    "steps": [
    "Préparation des données",
    "Entraînement du modèle",
    "Évaluation et amélioration du modèle"
    ]
    },
    {
    "name": "4_gestion_&_itération_scripts-Frontend",
    "duration": 20,
    "steps": [
    "Développement des interfaces utilisateur",
    "Création de composants réutilisables",
    "Optimisation de l'expérience utilisateur"
    ]
    },
    {
    "name": "5_gestion_&_itération_scripts-Backend",
    "duration": 20,
    "steps": [
    "Développement des services et des API",
    "Intégration avec des bases de données et des systèmes externes",
    "Gestion de la sécurité et des performances"
    ]
    },
    {
    "name": "6_test_&_débogage",
    "duration": 15,
    "steps": [
    "Écriture de tests automatisés",
    "Tests fonctionnels et de performance",
    "Débogage et correction de bogues"
    ]
    },
    {
    "name": "7_validation_&_documentation",
    "duration": 10,
    "steps": [
    "Vérification des exigences fonctionnelles",
    "Rédaction de la documentation technique",
    "Mise à jour de la documentation utilisateur"
    ]
    },
    {
    "name": "8_déploiement_&_system-version",
    "duration": 10,
    "steps": [
    "Configuration des environnements de production",
    "Déploiement de la solution",
    "Vérification et validation post-déploiement"
    ]
    },
    {
    "name": "9_contribution_&_affiliation",
    "duration": 10,
    "steps": [
    "Contributions au code source et aux documentations",
    "Établissement de collaborations et d'affiliations",
    "Suivi de la communauté et des retours utilisateurs"
    ]
    }
    ]
        }

        function createMarkdownFileForPhase(phase) {
            const fileContent = `# ${phase.name}
            Durée : ${phase.duration}
            Étapes :
            - ${phase.steps.join('\n- ')}
            `;
            const fileName = `Phase_${phase.name}.md`;
            const filePath = `./doc/${fileName}`;
            return new Promise((resolve, reject) => {
                fs.writeFile(filePath, fileContent, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(filePath);
                    }
                });
            });
        }
        
        async function createDocumentationForPhases() {
            const promises = project.phases.map(createMarkdownFileForPhase);
            const filePaths = await Promise.all(promises);
            console.log(`Les documents de phase ont été créés à ces emplacements : ${filePaths.join(', ')}`);
        }
        
        createDocumentationForPhases();

        
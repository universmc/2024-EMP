// Variables avec les revenus mensuels (fictifs pour cet exemple)
const revenuMensuel = 750;  // Revenu mensuel approximatif de Constantin (entre 700 et 800 €)
const revenuAnnuelConstantin = revenuMensuel * 12;  // Revenu annuel calculé à partir du revenu mensuel
// Calcul du salaire horaire
const salaireHoraire = revenuAnnuelConstantin / 1225;  // Calcul du salaire horaire
console.log(`Le revenu annuel de Constantin est de ${revenuAnnuelConstantin} euros.`);
console.log(`Le salaire horaire de Constantin est d'environ ${salaireHoraire} euros par heure.`);


  document.addEventListener('DOMContentLoaded', function() {
    const sommaire = document.getElementById('sommaire');

    // Charger le pipeline JSON correspondant à la phase
    fetch('src/json/pipeline_Questions éthiques et légales autour de la vente de produits de l'Elysée sur La Boutique Présidence de la République.json')
      .then(response => response.json())
      .then(pipeline => {
        pipeline.forEach(section => {
          const sectionLink = document.createElement('a');
          sectionLink.href = '#section-' + section.titre;
          sectionLink.textContent = section.titre;
          sommaire.appendChild(sectionLink);

          // Ajouter les sections dynamiquement dans le contenu
          const contentDiv = document.getElementById('content');
          const sectionDiv = document.createElement('div');
          sectionDiv.id = 'section-' + section.titre;
          sectionDiv.innerHTML = '<h2>' + section.titre + '</h2>';

          section.sousSections.forEach(sousSection => {
            const sousSectionDiv = document.createElement('div');
            sousSectionDiv.innerHTML = '<h3>' + sousSection.sousTitre + '</h3><p>' + sousSection.contenu + '</p>';
            sectionDiv.appendChild(sousSectionDiv);
          });

          contentDiv.appendChild(sectionDiv);
        });
      });
  });
  
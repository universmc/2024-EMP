async function loadTimeline() {
    try {
        const response = await fetch('src/json/chronology.json');
        const data = await response.json();
        const timelineContainer = document.getElementById('chronology-content');
        
        data.chronology.forEach(yearData => {
            const yearBlock = document.createElement('div');
            yearBlock.classList.add('year-block');
            yearBlock.innerHTML = `<h3>${yearData.year}</h3>`;
            
            yearData.events.forEach(event => {
                const eventBlock = document.createElement('div');
                eventBlock.classList.add('event-block');
                eventBlock.innerHTML = `
                    <p><strong>${event.timestamp}</strong> - ${event.title}</p>
                    <p>${event.description}</p>
                `;
                yearBlock.appendChild(eventBlock);
            });

            timelineContainer.appendChild(yearBlock);
        });
    } catch (error) {
        console.error('Erreur lors du chargement de la chronologie :', error);
        document.getElementById('chronology-content').innerHTML = '<p>Erreur lors du chargement des données.</p>';
    }
}

// Charger la chronologie au chargement de la page
window.onload = loadTimeline;
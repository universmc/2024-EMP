async function loadSection(section) {
    try {
        const response = await fetch(`src/json/${section}.json`);
        const data = await response.json();
        document.getElementById('content').innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <ul>${data.items.map(item => `<li>${item}</li>`).join('')}</ul>
        `;
    } catch (error) {
        console.error('Erreur lors du chargement de la section :', error);
        document.getElementById('content').innerHTML = '<p>Erreur lors du chargement de la section.</p>';
    }
}

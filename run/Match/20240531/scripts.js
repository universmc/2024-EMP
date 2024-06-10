document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Example of fetching data from an API and updating the DOM
    fetch('https://archive.org/metadata/affaire_910')
        .then(response => response.json())
        .then(data => {
            document.getElementById('introduction').innerHTML += `<p>${data.description}</p>`;
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.addEventListener("DOMContentLoaded", function () {

    // Eine Funktion, die eine Komponente lädt und in ein Ziel einfügt
    const loadComponent = (url, placeholderId, callback) => {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) return;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Komponente ${url} nicht gefunden`);
                return response.text();
            })
            .then(data => {
                placeholder.innerHTML = data;
                if (callback) callback(placeholder);
            })
            .catch(error => console.error(`Fehler beim Laden von ${url}:`, error));
    };

    // Navbar laden und den aktiven Link setzen
    loadComponent('navbar.html', 'navbar-placeholder', () => {
        const currentPage = window.location.pathname;
        const links = document.querySelectorAll('.navbar-right a');
        links.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPage || (currentPage === '/' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    });

    // Footer laden und das Jahr setzen
    loadComponent('footer.html', 'footer-placeholder', () => {
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    });

});
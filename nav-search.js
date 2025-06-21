document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');

    // This function will handle the redirect
    const redirectToExplorePage = () => {
        const searchTerm = searchInput.value.trim();

        // Only redirect if the user actually typed something
        if (searchTerm) {
            // Construct the URL with the query parameter and redirect
            // encodeURIComponent handles special characters like spaces
            window.location.href = `explore.html?q=${encodeURIComponent(searchTerm)}`;
        }
    };

    // Add event listeners
    searchButton.addEventListener('click', redirectToExplorePage);
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            redirectToExplorePage();
        }
    });
});
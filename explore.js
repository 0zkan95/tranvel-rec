
const input = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const resultsContainer = document.querySelector('.explore-main');

let allDestinations = [];

const renderDestinations = (destinations) => {
    resultsContainer.innerHTML = '';
    if (destinations.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No destinations found. Try another search!</p>';
        return;
    }

    destinations.forEach(destination => {
        const card = document.createElement('div');
        card.className = 'explore-card'; // Add the class for styling

        // Use a template literal for clean HTML creation
        card.innerHTML = `
            <img src="${destination.imageUrl}" alt="${destination.name}" class="explore-image">
            <h2>${destination.name}</h2>
            <p>${destination.description}</p>
            <button class="explore-button">Visit</button>
        `;

        resultsContainer.appendChild(card);
    });
}

const handleSearch = () => {
    const searchTerm = input.value.trim().toLowerCase();

    const filteredDestinations = allDestinations.filter(destination => {
        return destination.name.toLowerCase().includes(searchTerm);
    });

    renderDestinations(filteredDestinations);
}

const handleReset = () => {
    input.value = '';
    renderDestinations(allDestinations);
}

fetch('./travel-api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Flatten the data structure
        let flattenedData = [];
        if (data.countries) data.countries.forEach(country => flattenedData.push(...country.cities));
        if (data.temples) flattenedData.push(...data.temples);
        if (data.beaches) flattenedData.push(...data.beaches);
        allDestinations = flattenedData;

        // *** NEW LOGIC: CHECK URL FOR A SEARCH QUERY ***
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q'); // 'q' is the parameter we set in nav-search.js

        if (searchQuery) {
            // If a search query exists in the URL...
            searchInput.value = searchQuery; // Put the term in the search box for the user
            handleSearch(); // And perform the search immediately
        } else {
            // Otherwise, just show all destinations as usual
            renderDestinations(allDestinations);
        }
    })
    .catch(error => {
        console.error('Error fetching or processing data:', error);
        resultsContainer.innerHTML = '<p class="error">Could not load destination data.</p>';
    });


// ---- ADD EVENT LISTENERS ----
searchButton.addEventListener('click', handleSearch);
resetBtn.addEventListener('click', handleReset);


// ---ALLOW ENTER KEY TO SUBMIT SEARCH---
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        handleSearch();
    }
});
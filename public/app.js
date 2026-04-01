// app.js

// Function to save data to localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Function to retrieve data from localStorage
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Form handling logic
const form = document.getElementById('myForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    saveToLocalStorage('formData', data);
    alert('Form data saved!');
});

// Navigation logic
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetUrl = this.getAttribute('href');
        window.location.href = targetUrl;
    });
});

// Example: Retrieving data from localStorage when page loads
window.addEventListener('load', () => {
    const savedData = getFromLocalStorage('formData');
    if (savedData) {
        console.log('Retrieved data:', savedData);
    }
});

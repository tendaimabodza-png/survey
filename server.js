const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000; // You can specify any port you wish.
const dataFilePath = path.join(__dirname, 'data.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample in-memory data storage
let users = [];
let reviews = [];

// Load data from JSON file
if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath);
    const parsedData = JSON.parse(data);
    users = parsedData.users || [];
    reviews = parsedData.reviews || [];
}

// Main route showing all public reviews
app.get('/', (req, res) => {
    res.json({ reviews, message: "Public reviews" });
});

// Signup route for user registration
app.post('/signup', async (req, res) => {
    const { username, email, whatsapp, password } = req.body;

    // Validate input (example: checks for empty fields)
    if (!username || !email || !whatsapp || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Store new user
    users.push({ username, email, whatsapp, password: hashedPassword });
    saveData();
    res.status(201).json({ message: 'User registered successfully' });
});

// New route for submitting reviews
app.post('/new', (req, res) => {
    const { review } = req.body; // You can expand this as needed
    if (!review) {
        return res.status(400).json({ message: 'Review cannot be empty' });
    }
    reviews.push({ review }); // Store review
    saveData();
    res.status(201).json({ message: 'Review submitted successfully' });
});

// Make-admin route for admin responses
app.post('/make-admin', (req, res) => {
    const { username } = req.body; // Assuming you send the username of the user trying to become admin
    // Logic for making a user admin (needs validation/logic as per your requirement)
    res.json({ message: `User ${username} promoted to admin` });
});

// Function to save data
function saveData() {
    const dataToSave = { users, reviews };
    fs.writeFileSync(dataFilePath, JSON.stringify(dataToSave, null, 2));
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

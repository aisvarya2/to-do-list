const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const router = require('./routes/router'); // Import your router file
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
// Middleware to parse form data from HTML forms
app.use(express.urlencoded({ extended: true }));
// Middleware to enable PUT and DELETE methods in forms via _method
app.use(methodOverride('_method'));

// Mount router on /api to define the route prefix
app.use('/api', router);

// Serve static files from the public directory (for CSS, JS, etc.)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

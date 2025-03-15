//const express = require('express');
//const router = express.Router();
//
//let items = []; // Temporary in-memory storage
//
//// Example route: GET /hello
//router.get('/hello', (req, res) => {
//    res.json({ message: 'Hello, World!' });
//});
//
//// Create (POST /items)
//router.post('/items', (req, res) => {
//    const item = req.body;
//    console.log("POST /items route called");
//    items.push(item);
//    res.status(201).send(item); // Return the created item
//});
//
//// Read (GET /items)
//router.get('/items', (req, res) => {
//    res.send(items); // Return the list of items
//});
//
//router.get('/items/:id', (req, res) => {
//    const id = parseInt(req.params.id); // Extract ID from the request URL
//    const item = items[id]; // Retrieve the item using the index
//    console.log({item})
//
//    if (item) {
//        res.send(item); // Return the item if it exists
//    } else {
//        res.status(404).send({ error: "Item not found" }); // Handle invalid index
//    }
//});
//
//// Update (PUT /items/:id)
//router.put('/items/:id', (req, res) => {
//    const id = parseInt(req.params.id);
//    const updatedItem = req.body;
//    items[id] = updatedItem;
//    res.send(updatedItem); // Return the updated item
//});
//
//// Delete (DELETE /items/:id)
//router.delete('/items/:id', (req, res) => {
//    const id = parseInt(req.params.id);
//    items.splice(id, 1);
//    res.status(204).send(); // Return no content
//});
//
//router.post('/api/items/:id/edit', (req, res) => {
//    const id = parseInt(req.params.id);
//    items[id] = req.body;
//    res.redirect('/');
//});
//
//module.exports = router; // Export the router


const express = require('express');
const router = express.Router();

let items = []; // Temporary in-memory storage for tasks

// Render Home Page (GET /)
router.get('/items', (req, res) => {
    console.log('Items array:', items); // Debugging log to verify items array
    res.render('index', { items }); // Pass 'items' to the template
});


// Create a New Task (POST /api/items)
router.post('/items', (req, res) => {
    console.log("POST request received with data:", req.body);
    items.push(req.body);
    console.log("Updated items array:", items);
    res.redirect('/api/items');
});


// Delete a Task (POST /api/items/:id?_method=DELETE)
router.delete('/items/:id', (req, res) => {
    console.log(`DELETE request received for ID: ${req.params.id}`);
    const id = parseInt(req.params.id);
    if (id >= 0 && id < items.length) {
        items.splice(id, 1);
        console.log("Updated items array after deletion:", items);
        res.status(204).send();
    } else {
        res.status(404).send({ error: "Task not found" });
    }
});


// Render Edit Page (GET /api/items/:id/edit)
router.get('/items/:id/edit', (req, res) => {
    const id = parseInt(req.params.id); // Extract task ID from the URL
    const item = items[id]; // Fetch the task from the array
    if (item) {
        res.render('edit', { id, item }); // Render edit.ejs template
    } else {
        res.status(404).send({ error: "Item not found" }); // Handle invalid ID
    }
});

// Edit/Update a Task (POST /api/items/:id/edit)
router.post('/items/:id/edit', (req, res) => {
    const id = parseInt(req.params.id); // Extract task ID from the URL
    const updatedItem = req.body; // Extract updated task data from request body
    if (id >= 0 && id < items.length) {
        items[id] = updatedItem; // Update the task in the array
    }
    res.redirect('/'); // Redirect to the homepage
});

module.exports = router; // Export the router

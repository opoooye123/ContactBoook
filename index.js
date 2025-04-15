const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid'); // generate unique IDs
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));  // use ?_method=METHOD in query string
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sample contacts array
let information = [
    {
        id: uuid(),
        names: 'Ade',
        contact: '2348052455193',
        country: 'Nigeria'
    },
    {
        id: uuid(),
        names: 'John Doe',
        contact: '1234567890',
        country: 'USA'
    }
];

// Home route
app.get('/', (req, res) => {
    res.send('Home');
});

// List contacts
app.get('/contacts', (req, res) => {
    res.render('contacts', { information });
});

app.get('/contacts/new', (req, res) => {

    res.render('Functions/new');
});
// Contact details
app.get('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const contact = information.find(c => c.id === id);
    if (!contact) {
        return res.status(404).send("Contact not found");
    }
    res.render('Functions/details', { contact });
});


// Create a new contact
app.post('/contacts', (req, res) => {
    const { names, contact, country } = req.body;
    information.push({ id: uuid(), names, contact, country });
    res.redirect('/contacts');
});

// Edit contact form (render the form with pre-filled data)
app.get('/contacts/:id/edit', (req, res) => {
    const { id } = req.params;
    const contact = information.find(c => c.id === id);
    if (!contact) {
        return res.status(404).send("Contact not found");
    }
    res.render('Functions/edit', { contact });
});

// Update existing contact using PATCH
app.patch('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { names, contact, country } = req.body;
    const foundContact = information.find(c => c.id === id);
    if (!foundContact) {
        return res.status(404).send("Contact not found");
    }
    if (names !== undefined) foundContact.names = names;
    if (contact !== undefined) foundContact.contact = contact;
    if (country !== undefined) foundContact.country = country;
    res.redirect(`/contacts/${id}`);
});

app.listen(5555, () => {
    console.log('Server started at http://localhost:5555');
});

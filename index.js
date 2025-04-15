const express = require('express')
const app = express();
const path = require('path')
const { v4: ids } = require('uuid')
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let information = [
    {
        id: ids(),
        names: 'Ade',
        contact: '2348052455193',
        country: 'Nigeria'
    },
    {
        id: ids(),
        names: 'Ade',
        contact: '2348052455193',
        country: 'Nigeria'
    }
]
app.get('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const contact = information.find(c => c.id === id)
    res.render('Functions/details', { contact })
})
app.get('/contacts', (req, res) => {

    res.render('contacts', { information })
})
app.get('/contacts/new', (req, res) => {
    res.render('Functions/new')
})
app.post('/contacts', (req, res) => {
    const { names, contact, country } = req.body;
    information.push({ names, contact, country })
    res.redirect('/contacts')
})
app.get('/contacts/edit', (req, res) => {

    res.render('Functions/edit')
})
app.get('/', (req, res) => {
    res.send('Home')
})

app.listen('5555', () => {
    console.log('Port awake at http://localhost:5555')
})
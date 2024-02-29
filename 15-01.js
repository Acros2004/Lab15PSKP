const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const getHandler = require('./Handlers/GetHandler.js');
const postHandler = require('./Handlers/PostHandler.js');
const hbs = require('express-handlebars').create({
    extname: '.hbs',
    helpers: { dismiss: () => "window.location.href = '/'" }
});


app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(express.json());

app.get('/',async (req,res) =>{
    await getHandler.getAll(req,res);
});
app.get('/id',async (req,res) =>{
    await getHandler.getContact(req,res);
});
app.get('/add',async (req,res) =>{
    await getHandler.getAddContactForm(req,res);
});
app.get('/update',async (req,res) =>{
    await getHandler.getUpdateContactForm(req,res);
});
app.post('/add',async (req,res) =>{
    await postHandler.addContactIntoFile(req,res);
});
app.post('/update',async (req,res) =>{
    await postHandler.editContactIntoFile(req,res);
});
app.post('/delete',async (req,res) =>{
    await postHandler.deleteContactFromFile(req,res);
});

app.listen( 3000, () => console.log(`[OK] Server running at localhost:3000/\n`));
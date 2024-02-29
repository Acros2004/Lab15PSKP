const contacts = require('../contacts') || [];

const getContactsFromFile = async () => await contacts;
const getContactByID = async id => {
    const contact = await contacts.find(c => c.id === id);
    return contact ? contact : 'Not found'
};


const Methods = {
    async getAll(req, res) {
        try {
            const contacts = await getContactsFromFile();
            console.log(contacts);
            res.render('contacts', {
                buttonsEnabled: true,
                contacts: contacts
            });
        } catch (err) { console.log(err); }
    },
    async getContact(req, res) {
        try {
            if (req.query.id) {
                const contact = await getContactByID(req.query.id);
                res.json(contact);
            } else {
                res.end('Parameter not found');
            }
        } catch (err) { console.log(err); }
    },
    async getAddContactForm(req, res) {
        let contacts = [];
        contacts = await getContactsFromFile();
        res.render('newContact', {
            buttonsEnabled: false,
            contacts: contacts
        });
    },
    async getUpdateContactForm(req, res) {
        let contacts = [], contact;
        contacts = await getContactsFromFile();
        contact = await getContactByID(req.query.id);
        res.render('editContact', {
            buttonsEnabled: false,
            contacts: contacts,
            thisContact: contact
        });
    }

}

module.exports = Methods;



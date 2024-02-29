const contacts = require('../contacts') || [];
const uuid = require('uuid');

const addContact = async data => {
    contacts.push({
        id: uuid.v4(),
        name: data.name,
        phone: data.phone
    });
    saveToFile();
    return contacts;
};
const editContact = async (id, data) => {
    const contact = await contacts.find(c => c.id === id);
    if (contact) {
        contact.name = data.name;
        contact.phone = data.phone;
    }
    saveToFile();
    return contacts;
};
const deleteContact = async id => {
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
        contacts.splice(index, 1);
    }
    await saveToFile();
    return contacts;
};
const saveToFile = async () => {
    try { await fs.promises.writeFile('./contacts.json', JSON.stringify(contacts, null, 4)); }
    catch (err) { console.log(err); }
}

const Methods = {
    async addContactIntoFile(req, res) {
        if (req.body.name && req.body.phone) {
            await addContact(req.body)
                .then(result => res.json(result))
                .catch(err => console.error(err.message));
        } else {
            res.end('Parameters not found');
        }
    },
    async editContactIntoFile(req, res) {
        if (req.query.id && req.body.name && req.body.phone) {
            await editContact(req.query.id, req.body)
                .then(result => res.json(result))
                .catch(err => console.error(err.message));
        } else {
            res.end('Parameters not found');
        }
    },
    async deleteContactFromFile(req, res) {
        if (req.query.id) {
            await deleteContact(req.query.id)
                .then(result => res.json(result))
                .catch(err => console.error(err.message));
        } else {
            res.end('Parameters not found');
        }
    }

}

module.exports = Methods;
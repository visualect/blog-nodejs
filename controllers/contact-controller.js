const { Contacts } = require('../models/contacts.js')
const getPath = require('../helpers/get-path.js')

const getContacts = (req, res) => {
    const title = 'Contacts';
    const style = '/contacts.css'
    Contacts
        .find()
        .then(contacts => res.render(getPath('contacts'), { contacts, title, style }))
        .catch(err => {
            console.log(err);
            res.render(getPath('error'), { title: 'Error', style: '/error.css' })
        })
};

module.exports = { getContacts }
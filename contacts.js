const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, "db/contacts.json");
 

async function listContacts() {
const data = await fs.readFile(contactsPath)
return JSON.parse(data);
  }
  
 async function getContactById(contactId) {
const contacts = await listContacts();
const contact = contacts.find(({id}) => contactId === id)
return contact || null
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex === -1) return null;
    const [deletedContact] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: Math.floor(Math.random() * 10000000001).toString(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

  module.exports = {
    getContactById,
    listContacts,
    removeContact,
    addContact,
  };
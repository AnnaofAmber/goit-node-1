const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  } = require("./contacts");

  const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
   const contacts = await listContacts()
   console.table(contacts)
      break;

    case 'get':
      const contactId = await getContactById(id)
      console.table(contactId)
      break;

    case 'add':
        const newContact = await addContact(name, email, phone);
        console.table(newContact);
      break;

    case 'remove':
        const removedContact = await removeContact(id);
        console.table(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
import { program } from "commander";
import * as contactService from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "getAll":
      const allContacts = await contactService.getAllContacts();
      return console.table(allContacts);
    case "getById":
      const contactById = await contactService.getContactById(id);
      return console.log(contactById);
    case "add":
      const newContact = await contactService.addContact(data);
      return console.log(newContact);
    case "update":
      const updateContact = await contactService.updateContactById(id, data);
      return console.log(updateContact);
    case "delete":
      const deleteContact = await contactService.deleteContactById(id);
      return console.log(deleteContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

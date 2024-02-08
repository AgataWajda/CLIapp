const fs = require("fs").promises;

const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");
console.log(contactsPath);

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data);

		console.table(contacts);
	} catch (error) {
		console.log(error.message);
	}
}

async function getContactById(contactId) {
	try {
		const resp = await fs.readFile(contactsPath);
		const data = JSON.parse(resp);
		const contact =
			data.find((contact) => contact.id === contactId) || "\n Not found \n";
		console.log(contact);
	} catch (error) {
		console.log(error.message);
	}
}

async function removeContact(contactId) {
	try {
		const resp = await fs.readFile(contactsPath);
		const data = JSON.parse(resp);
		const isInArray = data.findIndex((item) => item.id === contactId);
		if (isInArray === -1) {
			console.log("\n There is not contact with this id \n");
		}
		const array = data.filter((contact) => contact.id !== contactId);

		try {
			await fs.writeFile(contactsPath, JSON.stringify(array));
			console.table(array);
			console.log(` \n The contact has been successfully deleted. \n`);
		} catch (error) {
			console.error(` \n Error deleting contact: ${err.message} \n`);
		}
	} catch (error) {
		console.log(error.message);
	}
}

async function addContact(name, email, phone) {
	try {
		const resp = await fs.readFile(contactsPath);
		const data = JSON.parse(resp);
		const array = data.concat({
			id: nanoid(),
			name,
			email,
			phone,
		});
		try {
			await fs.writeFile(contactsPath, JSON.stringify(array));
			console.table(array);
			console.log(` \n The data has been successfully written to the file. \n`);
		} catch (error) {
			console.error(` \n Error writing to file: ${err.message} \n`);
		}
	} catch (error) {
		console.log(error.message);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};

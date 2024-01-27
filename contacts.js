const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");
console.log(contactsPath);

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = await JSON.parse(data);
		await console.table(contacts);
	} catch (error) {
		console.log(error.message);
	}
}

async function getContactById(contactId) {
	try {
		const resp = await fs.readFile(contactsPath);
		const data = await JSON.parse(resp);
		const contact = await data.find((contact) => contact.id === contactId);
		await console.log(contact);
	} catch (error) {
		console.log(error.message);
	}
}

async function removeContact(contactId) {
	try {
		const resp = await fs.readFile(contactsPath);
		const data = await JSON.parse(resp);
		const array = await data.filter((contact) => contact.id !== contactId);
		await fs.writeFile(contactsPath, JSON.stringify(array));
	} catch (error) {
		console.log(error.message);
	}
}

async function addContact(name, email, phone) {
	try {
		const resp = await fs.readFile(contactsPath);
		const data = await JSON.parse(resp);
		const array = await data.concat({
			id: nanoid(),
			name,
			email,
			phone,
		});
		await fs.writeFile(contactsPath, JSON.stringify(array), (err) => {
			if (err) {
				console.error(
					`Błąd podczas zapisywania do pliku ${filePath}: ${err.message}`
				);
			} else {
				console.log(`Dane zostały pomyślnie zapisane do pliku ${filePath}.`);
			}
		});
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};

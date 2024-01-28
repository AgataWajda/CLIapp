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
		const contact =
			(await data.find((contact) => contact.id === contactId)) ||
			(await "\n Not found \n");
		await console.log(contact);
	} catch (error) {
		console.log(error.message);
	}
}

async function removeContact(contactId) {
	try {
		const resp = await fs.readFile(contactsPath);
		const data = await JSON.parse(resp);
		const isInArray = await data.findIndex((item) => item.id === contactId);
		if (isInArray === -1) {
			console.log("\n There is not contact with this id \n");
		}
		const array = await data.filter((contact) => contact.id !== contactId);

		try {
			await fs.writeFile(contactsPath, JSON.stringify(array));
			await console.table(array);
			console.log(` \n Kontakt został pomyślnie usunięty. \n`);
		} catch (error) {
			console.error(` \n Błąd podczas usuwania kontaktu: ${err.message} \n`);
		}
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
		try {
			await fs.writeFile(contactsPath, JSON.stringify(array));
			await console.table(array);
			console.log(` \n Dane zostały pomyślnie zapisane do pliku. \n`);
		} catch (error) {
			console.error(` \n Błąd podczas zapisywania do pliku: ${err.message} \n`);
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

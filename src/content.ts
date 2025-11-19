import { faker } from "@faker-js/faker";

function getLabelText(element: HTMLInputElement | HTMLTextAreaElement): string | null {
	const id = element.id;
	if (id) {
		const label = document.querySelector(`label[for="${id}"]`);
		if (label) return label.textContent?.toLowerCase() || null;
	}
	return null;
}

function matchesAttribute(element: HTMLInputElement | HTMLTextAreaElement, keywords: string[]): boolean {
	const attrs = [element.type, element.name, element.id, element.placeholder, getLabelText(element)].map(a => a?.toLowerCase());
	return attrs.some(attr => attr && keywords.some(kw => attr.includes(kw)));
}

function detectFieldType(element: HTMLInputElement | HTMLTextAreaElement): string {
	// Subtype checks first
	if (matchesAttribute(element, ["first"])) return "firstName";
	if (matchesAttribute(element, ["last"])) return "lastName";
	if (matchesAttribute(element, ["company"])) return "companyName";
	if (matchesAttribute(element, ["line1"])) return "addressLine1";
	if (matchesAttribute(element, ["line2"])) return "addressLine2";
	if (matchesAttribute(element, ["age"])) return "age";
	if (matchesAttribute(element, ["zip"])) return "zip";
	if (matchesAttribute(element, ["salary"])) return "salary";

	// Generic checks
	if (matchesAttribute(element, ["email"])) return "email";
	if (matchesAttribute(element, ["phone"])) return "phone";
	if (matchesAttribute(element, ["name"])) return "name";
	if (matchesAttribute(element, ["address"])) return "address";
	if (matchesAttribute(element, ["url"])) return "url";
	if (element.type?.toLowerCase() === "number" || matchesAttribute(element, ["number"])) return "number";
	// Default to text
	return "text";
}

function generateMockData(type: string): string {
	switch (type) {
		case "email":
			return faker.internet.email();
		case "phone":
			return faker.phone.number();
		case "firstName":
			return faker.person.firstName();
		case "lastName":
			return faker.person.lastName();
		case "companyName":
			return faker.company.name();
		case "name":
			return faker.person.fullName();
		case "addressLine1":
			return faker.location.streetAddress();
		case "addressLine2":
			return faker.location.secondaryAddress();
		case "address":
			return faker.location.streetAddress();
		case "url":
			return faker.internet.url();
		case "age":
			return faker.number.int({ min: 18, max: 80 }).toString();
		case "zip":
			return faker.location.zipCode();
		case "salary":
			return faker.number.int({ min: 30000, max: 150000 }).toString();
		case "number":
			return faker.number.int({ min: 1, max: 100 }).toString();
		default:
			return faker.lorem.words(3);
	}
}

document.addEventListener("dblclick", (event) => {
	if (!event.altKey) return;

	const target = event.target as HTMLElement;
	if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
		const element = target as HTMLInputElement | HTMLTextAreaElement;
		const fieldType = detectFieldType(element);
		const mockData = generateMockData(fieldType);
		element.value = mockData;
		event.preventDefault();
	}
});

import { faker } from "@faker-js/faker";

function detectFieldType(
	element: HTMLInputElement | HTMLTextAreaElement,
): string {
	const type = element.type?.toLowerCase();
	const name = element.name?.toLowerCase();
	const id = element.id?.toLowerCase();
	const placeholder = element.placeholder?.toLowerCase();

	if (
		type === "email" ||
		name?.includes("email") ||
		id?.includes("email") ||
		placeholder?.includes("email")
	) {
		return "email";
	}
	if (
		type === "tel" ||
		name?.includes("phone") ||
		id?.includes("phone") ||
		placeholder?.includes("phone")
	) {
		return "phone";
	}
	if (
		name?.includes("name") ||
		id?.includes("name") ||
		placeholder?.includes("name")
	) {
		return "name";
	}
	if (
		name?.includes("address") ||
		id?.includes("address") ||
		placeholder?.includes("address")
	) {
		return "address";
	}
	if (
		type === "url" ||
		name?.includes("url") ||
		id?.includes("url") ||
		placeholder?.includes("url")
	) {
		return "url";
	}
	if (
		type === "number" ||
		name?.includes("age") ||
		name?.includes("zip") ||
		name?.includes("postcode")
	) {
		return "number";
	}
	// Default to text
	return "text";
}

function generateMockData(type: string): string {
	switch (type) {
		case "email":
			return faker.internet.email();
		case "phone":
			return faker.phone.number();
		case "name":
			return faker.person.fullName();
		case "address":
			return faker.location.streetAddress();
		case "url":
			return faker.internet.url();
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

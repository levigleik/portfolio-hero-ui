export const contactLimits = {
	name: 100,
	email: 254,
	phone: 30,
	message: 5000,
};
export type ContactField = "name" | "email" | "phone" | "message";
export type ContactFields = Record<ContactField, string>;

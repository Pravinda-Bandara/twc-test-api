// Function to validate contact details


import {ContactRequest} from "../types/contactTypes.js";

export const ContactValidationUtil = (contact: ContactRequest): string | null => {
    const { name, email, number, gender } = contact;

    if (!name) {
        return 'Name is required';
    }

    if (!email) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Invalid email format';
    }

    if (!number) {
        return 'Number is required';
    }
    const numberRegex = /^[\d\s+]+$/;
    if (!numberRegex.test(number)) {
        return 'Invalid number format';
    }

    if (gender !== 'male' && gender !== 'female') {
        return 'Invalid gender';
    }

    return null;
};

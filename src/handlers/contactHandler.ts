import express from 'express';
import { ContactModel } from '../models/contact.js';

import {ContactValidationUtil} from "../utils/ContactValidationUtil.js";
import {ContactRequest, ContactResponse} from "../types/contactTypes.js";


// Function to save a new contact
export const saveContact = async (req: express.Request, res: express.Response) => {
    try {
        const contactDetail = req.body as ContactRequest;

        // Validate contact details
        const validationError = ContactValidationUtil(contactDetail);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const contact = await ContactModel.create(contactDetail);

        if (!contact) return res.status(400).json({ message: 'Failed to save contact' });

        const saveContactResponse = {
            _id: contact._id,
            number: contact.number,
            name: contact.name,
            email: contact.email,
            gender: contact.gender
        };

        return res.status(201).json(saveContactResponse);

    } catch (error) {
        console.error('Error saving contact:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to retrieve contacts for a given user by User Id
export const getContacts = async (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;

    try {
        const contacts = await ContactModel.find({ user: userId });

        if (!contacts) return res.status(404).json({ message: 'Contacts not found' });

        const response: ContactResponse[] = contacts.map(contact => ({
            _id: contact._id,
            number: contact.number,
            name: contact.name,
            email: contact.email,
            gender: contact.gender
        }));

        return res.status(200).json(response);

    } catch (error) {
        console.error('Error fetching contacts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to delete a contact by Contact ID
export const deleteContact = async (req: express.Request, res: express.Response) => {
    const contactId = req.params.ContactId;

    try {
        const deletedContact = await ContactModel.findByIdAndDelete(contactId);

        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        return res.status(200).json({ message: 'Contact deleted successfully' });

    } catch (error) {
        console.error('Error deleting contact:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

//Function to update a contact by Contact ID
export const updateContact = async (req: express.Request, res: express.Response) => {
    const contactId = req.params.ContactId;
    const updateFields = req.body as Partial<ContactRequest>;

    try {
        // Validate contact details
        const validationError = ContactValidationUtil(updateFields as ContactRequest);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const updatedContact = await ContactModel.findByIdAndUpdate(contactId, updateFields, { new: true });

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        const updateContactResponse = {
            _id: updatedContact._id,
            number: updatedContact.number,
            name: updatedContact.name,
            email: updatedContact.email,
            gender: updatedContact.gender
        };

        return res.status(200).json(updateContactResponse);

    } catch (error) {
        console.error('Error updating contact:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
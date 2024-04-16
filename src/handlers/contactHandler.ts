import express from 'express';
import { Gender, ContactModel } from '../models/contact.js';
import mongoose from 'mongoose';

interface ContactRequest {
    number: string;
    name: string;
    email: string;
    gender: Gender;
    user: string;
}

interface ContactResponse {
    _id: mongoose.Types.ObjectId | undefined;
    number: string;
    name: string;
    email: string;
    gender: Gender;
}

// Function to save a new contact
export const saveContact = async (req: express.Request, res: express.Response) => {
    try {
        const contactDetail = req.body as ContactRequest;

        const contact = await ContactModel.create(contactDetail);

        if (!contact) return res.status(400).json({ message: 'Failed to save contact' });

        return res.status(201).json({ message: 'Contact saved successfully', contact });

    } catch (error) {
        console.error('Error saving contact:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Function to retrieve contacts for a given user by User Id
export const getContacts = async (req: express.Request, res: express.Response) => {
    const userId = req.params.id;

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
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Function to delete a contact by Contact ID
export const deleteContact = async (req: express.Request, res: express.Response) => {
    const contactId = req.params.id;

    try {
        const deletedContact = await ContactModel.findByIdAndDelete(contactId);

        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        return res.status(200).json({ message: 'Contact deleted successfully', deletedContact });

    } catch (error) {
        console.error('Error deleting contact:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Function to update a contact by Contact ID
export const updateContact = async (req: express.Request, res: express.Response) => {
    const contactId = req.params.id;
    const updateFields = req.body as Partial<ContactRequest>;

    try {
        const updatedContact = await ContactModel.findByIdAndUpdate(contactId, updateFields, { new: true });

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        return res.status(200).json({ message: 'Contact updated successfully', updatedContact });

    } catch (error) {
        console.error('Error updating contact:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
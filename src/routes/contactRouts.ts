import express from 'express';
import {saveContact, deleteContact, getContacts, updateContact} from "../handlers/contactHandler.js";

const contactRoutes = express.Router();


contactRoutes.post('/', saveContact);
contactRoutes.get('/:id', getContacts);
contactRoutes.delete('/:id', deleteContact);
contactRoutes.patch('/:id', updateContact);


export default contactRoutes;

import express from 'express';
import {saveContact, deleteContact, getContacts, updateContact} from "../handlers/contactHandler.js";

const contactRoutes = express.Router();


contactRoutes.post('/', saveContact);
contactRoutes.get('/:userId', getContacts);
contactRoutes.delete('/:ContactId', deleteContact);
contactRoutes.patch('/:ContactId', updateContact);


export default contactRoutes;

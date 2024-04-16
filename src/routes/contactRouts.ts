import express from 'express';
import {saveContact, deleteContact, getContacts, updateContact} from "../handlers/contactHandler.js";

const contactRoutes = express.Router();


contactRoutes.post('/', saveContact);
contactRoutes.get('/:userid', getContacts);
contactRoutes.delete('/:contactid', deleteContact);
contactRoutes.patch('/:contactid', updateContact);


export default contactRoutes;

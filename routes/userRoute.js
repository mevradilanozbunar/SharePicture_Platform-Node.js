import express from 'express';
import * as userController from '../controllers/userController.js';

const Userrouter = express.Router();

Userrouter.route('/register').post(userController.createUser);

export default Userrouter;
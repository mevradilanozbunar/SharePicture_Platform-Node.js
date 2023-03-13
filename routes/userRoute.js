import express from 'express';
import * as userController from '../controllers/userController.js';
import * as authorization from '../middlewares/authorization.js';
const Userrouter = express.Router();

Userrouter.route('/register').post(userController.createUser);
Userrouter.route('/login').post(userController.loginUser);
Userrouter.route('/dashboard').get(authorization.validateToken, userController.getDashboardPage);
Userrouter.route('/').get(authorization.validateToken,userController.getAllUsers);
Userrouter.route("/:id").get(authorization.validateToken,userController.getAUser);
Userrouter.route("/:id/follow").put(authorization.validateToken,userController.follow);
Userrouter.route("/:id/unfollow").put(authorization.validateToken,userController.unfollow);
Userrouter.route("/:id").put(authorization.validateToken,userController.updateAProfilInfo);

export default Userrouter; 
import express from 'express';
import * as pageController from '../controllers/pageController.js';    
import * as authorization from '../middlewares/authorization.js';

const Pagerouter = express.Router();

Pagerouter.route("/").get(authorization.validateToken, pageController.getIndexPage);
Pagerouter.route("/about").get(pageController.getAboutPage);
Pagerouter.route("/register").get(pageController.getRegisterPage);
Pagerouter.route("/login").get(pageController.getLoginPage);

export default Pagerouter;
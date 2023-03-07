import express from 'express';
import * as pageController from '../controllers/pageController.js';    

const Pagerouter = express.Router();

Pagerouter.route("/").get(pageController.getIndexPage);
Pagerouter.route("/about").get(pageController.getAboutPage);
Pagerouter.route("/register").get(pageController.getRegisterPage);
Pagerouter.route("/login").get(pageController.getLoginPage);
Pagerouter.route("/logout").get(pageController.getLogout);

export default Pagerouter;
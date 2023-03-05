import express from 'express';
import * as pageController from '../controllers/pageController.js';    

const Pagerouter = express.Router();

Pagerouter.route("/").get(pageController.getIndexPage);
Pagerouter.route("/about").get(pageController.getAboutPage);

export default Pagerouter;
import express from 'express';
import * as photoController from '../controllers/photoController.js';    

const Photorouter = express.Router();

Photorouter.route("/").post(photoController.createPhoto).get(photoController.getAllPhotos);

export default Photorouter;
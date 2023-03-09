import express from 'express';
import * as photoController from '../controllers/photoController.js';    

const Photorouter = express.Router();

Photorouter.route("/").post(photoController.createPhoto).get(photoController.getAllPhotos);
Photorouter.route("/:id").get(photoController.getAPhoto);
Photorouter.route("/:id").delete(photoController.deleteAPhoto);
Photorouter.route("/:id").put(photoController.updateAPhoto);


export default Photorouter;